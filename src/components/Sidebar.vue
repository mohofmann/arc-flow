<template>
  <div>
    <br>
    <h4 style="color: #FFFFFF">ARCflow 0.1</h4>
    <br>
    <b-button @click="createElement('BOX')">&nbsp;{{ msg }}&nbsp;&nbsp;</b-button>
    <br><br>
    <b-button @click="createElement('CIRCLE')">New Circle</b-button>
    <p style="position: absolute; bottom: 0;">&nbsp;&nbsp;&nbsp;&nbsp;Moritz Hofmann</p>
  </div>
</template>

<script>
import { EventBus } from '../main.js'

export default {
  name: 'Menu',
  props: {
    msg: String
  },
  data: function () {
    return {
      inputString: ''
    };
  },
  methods: {
    createElement: elementName => {
      EventBus.$emit('createElement', elementName)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
