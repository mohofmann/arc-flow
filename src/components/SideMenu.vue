<template>
  <nav>
    <br>
    <h4 style="color: #FFFFFF">ARCflow 0.1</h4>
    <br>
    <b-button @click="createElement('DATASOURCE')">&nbsp;{{ msg }}&nbsp;&nbsp;</b-button>
    <br><br>
    <b-button @click="createElement('PREPROCESSOR')">New Preprocessor</b-button>
    <p style="position: absolute; bottom: 0; color: #000000">&nbsp;&nbsp;&nbsp;&nbsp;Moritz Hofmann</p>
  </nav>
</template>

<script>
import { EventBus } from '../main.js'

export default {
  name: 'SideMenu',
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
