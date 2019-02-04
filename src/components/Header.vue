<template>
  <md-toolbar :md-elevation="1" class="header">
    <h2>&nbsp;&nbsp;ARCFLOW</h2>
    <span>&nbsp;&nbsp;&nbsp;v 0.349</span>
    <span style="flex: 1"></span>
    <md-tabs @md-changed="switchTab">
      <md-tab id="editor-tab" md-label="Editor"></md-tab>
      <md-tab id="analytics-tab" md-label="Analytics"></md-tab>
    </md-tabs>
    <span style="flex: 1"></span>
    <md-button @click="run" class="md-icon-button md-raised run">
      <md-icon>play_arrow</md-icon>
    </md-button>&nbsp;&nbsp;
    <md-button @click="" class="md-icon-button md-raised">
      <md-icon>settings</md-icon>
    </md-button>
  </md-toolbar>
</template>

<script>
import { EventBus } from '../main.js'

export default {
  name: 'Header',
  methods: {
    run: () => {
      EventBus.$emit('runFlow', null)
    },
    switchTab: tabId => {
      console.log(tabId)
      EventBus.$emit('switchTab', tabId)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
