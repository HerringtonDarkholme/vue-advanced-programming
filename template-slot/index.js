const repeat = {
  template: `
<p>
  {{repeat}}<br/>
  <v-outlet source="render" :$ctx="{i: repeat}" v-for="i in repeat">
    <span>I'm default content!<br/></span>
  </v-outlet>
  <v-outlet :$ctx="{i: repeat}" v-for="i in repeat">
    <span>I'm default content!<br/></span>
  </v-outlet>
</p>`,
  data: () => ({repeat: 3})
}

new Vue({
  template: `
<repeat>

    <v-template inline-template>
      <span>I am default!<br/></span>
    </v-template>

    <v-template slot="not-render" inline-template>
      <span>I will not be repeted.<br/></span>
    </v-template>

    <v-template slot="render" inline-template>
      <span>I will be repeted for {{$ctx.i}} times<br/></span>
    </v-template>
</repeat>`,
  components: { repeat },
  el: '#app'
})
