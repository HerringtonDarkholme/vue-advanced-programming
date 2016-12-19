function Foo(resolve) {
  setTimeout(() => {
    resolve({
      template: '<div class="foo">foo</div>'
    })
  })
}

const router = new VueRouter({
  routes: [
    { path: '/', component: Foo }
  ]
})

new Vue({
  template: '<div id="app"><router-view/></div>',
  router
}).$mount('#app')
