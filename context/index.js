function contextToken(name) {
  return typeof Symbol === 'function' ? Symbol(name) : name + Math.random()
}

Vue.mixin({
  beforeCreate() {
    if (!this.$options.expose) return
    const computed = this.$options.computed || {}
    computed.$context = () => this.$options.expose.call(this, this)
    this.$options.computed = computed
  }
})

Vue.mixin({
  beforeCreate() {
    if (!this.$options.inject) return
    const computed = this.$options.computed || {}
    for (let key of Object.keys(this.$options.inject)) {
      const token = this.$options.inject[key]
      computed[key] = () => this.$inject({token})
    }
    this.$options.computed = computed
  },
  methods: {
    $inject({token, all}) {
      let parent = this
      let ret = []
      while (parent) {
        const $context = parent.$context
        if ($context && $context.hasOwnProperty(token)) {
          if (all) ret.push($context[token])
          else return $context[token]
        }
        parent = parent.$parent
      }
      return all ? ret : undefined
    }
  }
})


// example

var user = contextToken('user')
var anotherUser = contextToken('user')
var allUser = contextToken('allUser')

Vue.component('parent', {
  template: `
    <div>
      <button @click="user.name += 1">+1</button><br/>
      Child in template: <child></child>
      Man in the middle: <mitm></mitm>
      <slot></slot>
    </div>`,

  data() {
    return {
      user: {
        name: 'Sebastian ',
      },
    }
  },
  expose: (vm) => ({
      [user]: vm.user,
      [allUser]: vm.user.name
  })
})

Vue.component('mitm', {
  template: `<child></child>`,
  data() {
    return {
      user: {
        name: 'Deyne',
      }
    }
  },
  expose() {
    let name = this.user.name
    return {
      [anotherUser]: this.user,
      [allUser]: name
    }
  }
})

Vue.component('child', {
  template: '<div>{{ user.name }} in {{$inject({token: allUser, all: true})}}</div>',
  data: () => ({allUser}),
  inject: { user }
})

new Vue({
  el: '#app',
  template: '<parent>Another child in slot: <child></child></parent>'
})
