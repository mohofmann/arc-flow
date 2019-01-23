<template>
  <nav id="sideMenu">
    <md-toolbar :md-elevation="1">
      <span class="md-title" style="width: 100%; text-align: center">ARCflow</span>
    </md-toolbar>
    <br>
    <md-button class="md-raised af-full-width" @click="createNode('DATASOURCE')">&nbsp;{{ msg }}&nbsp;&nbsp;</md-button>
    <md-button class="md-raised af-full-width" @click="createNode('MEMORY')">Memory</md-button>
    <md-button class="md-raised af-full-width" @click="createNode('RANGE')">Range</md-button>
    <md-button class="md-raised af-full-width" @click="createNode('PREPROCESSOR')">Preprocessor</md-button>
    <md-button class="md-raised af-full-width" @click="createNode('PEAKDETECTOR')">Peak Detector</md-button>
  </nav>
</template>

<script>
import { EventBus } from '../main.js'
import Memory from '../classes/nodes/Memory.js'

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
    createNode: nodeName => {
      EventBus.$emit('createNode', nodeName)
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
