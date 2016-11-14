Vue.component('v-template', {})

Vue.component('v-outlet', {
  props: {
    source: {
      type: String,
      default: 'default',
    },
    bindTo: {
      type: Vue
    },
    $ctx: {}
  },
  created() {
    let $parent = this.bindTo || this.$parent
    let slots = $parent && $parent.$slots
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
