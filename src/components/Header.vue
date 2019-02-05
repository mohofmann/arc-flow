<template>
  <md-toolbar :md-elevation="1" class="header">
    <h2 @click="reload" style="cursor: pointer">&nbsp;&nbsp;ARCFLOW</h2>
    <span>&nbsp;&nbsp;&nbsp;v 0.5</span>
    <span style="flex: 1"></span>
    <md-tabs @md-changed="switchTab" :md-active-tab="activeTab">
      <md-tab id="editor-tab" md-label="Editor"></md-tab>
      <md-tab id="analytics-tab" md-label="Analytics"></md-tab>
    </md-tabs>
    <span style="flex: 1"></span>
    <md-button @click="run" class="md-icon-button md-raised run">
      <md-icon>play_arrow</md-icon>
    </md-button>&nbsp;&nbsp;
    <md-button @click="loadCanvas" class="md-icon-button md-raised">
      <md-icon>cloud_upload</md-icon>
    </md-button>&nbsp;&nbsp;
    <md-button class="md-icon-button md-raised">
      <md-icon>settings</md-icon>
    </md-button>
  </md-toolbar>
</template>

<script>
import { EventBus } from '../main.js'

const setupEvents = function () {
  EventBus.$on('setTab', tabId => {
    this.activeTab = tabId
  })
}

const switchTab = function (tabId) {
  this.activeTab = tabId
  EventBus.$emit('switchTab', tabId)
}

export default {
  name: 'Header',
  data: function () {
    return {
      activeTab: 'editor-tab'
    }
  },
  methods: {
    run: () => {
      EventBus.$emit('runFlow', null)
    },
    loadCanvas: () => {
      EventBus.$emit('loadCanvas', null)
    },
    reload: () => {
      location.reload()
    },
    switchTab: switchTab
  },
  created: setupEvents
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
