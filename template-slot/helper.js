Vue.component('v-template', {
  created() {
    this.$options.render = h => h('')
  }
})
Vue.component('v-outlet', {
  props: {
    source: {
      type: String,
      default: 'default',
    },
    $ctx: {}
  },
  created() {
    let slots = this && this.$parent && this.$parent.$slots
    let vnodes = slots && slots[this.source]
    let vnode = vnodes && vnodes[0]
    let template = vnode && vnode.data && vnode.data.inlineTemplate
    if (!template) {
      this.$options.render = function(h) {
        let fallbacks = this.$slots.default
        return (fallbacks && fallbacks[0]) || h('')
      }
      return
    }
    this.$options.render = template.render
    this.$options.staticRenderFns = template.staticRenderFns
  }
})
