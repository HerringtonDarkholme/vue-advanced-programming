var kkk = new Vue({
  el: '#app',

  template: `
<div id="app"><foo></foo><bar></bar></div>`,

  components: {
    foo: resolve => {
      setTimeout(() => {
        resolve({
          template: '<p class="foo">foo2222</p>'
        });
      }, 1000);
    },
    bar: resolve => {
      // setTimeout(() => {
        resolve({
          template: '<div class="bar">bar</div>'
        });
      // }, 1000);
    },
  }
});
