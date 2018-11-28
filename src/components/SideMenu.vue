<template>
  <nav id="sideMenu">
    <md-toolbar :md-elevation="1">
      <span class="md-title" style="width: 100%; text-align: center">ARCflow</span>
    </md-toolbar>
    <br>
    <md-button class="md-raised af-full-width" @click="createElement('DATASOURCE')">&nbsp;{{ msg }}&nbsp;&nbsp;</md-button>
    <md-button class="md-raised af-full-width" @click="createElement('PREPROCESSOR')">Preprocessor</md-button>
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

  .md-button {
    margin: 12px 0;
  }

</style>
