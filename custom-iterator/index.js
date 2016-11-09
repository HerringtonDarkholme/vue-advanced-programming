class Counter {
  constructor() {
    this.i = 1
  }
  *[Symbol.iterator]() {
    for (let i = 0; i < this.i; i++) yield i
  }
  increment() {
    this.i++
  }
}

new Vue({
  el: '#app',
  template: `
<div>
  <button @click="list.increment()">+1</button>
  <p v-for="v of [...list]">{{v}}</p>
</div>`,
  data: {
    list: new Counter
  }
})
