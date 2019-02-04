<template>
  <div id="app">
    <md-toolbar :md-elevation="1" class="header">
      <h2>&nbsp;&nbsp;ARCFLOW</h2>
      <span>&nbsp;&nbsp;&nbsp;v 0.349</span>
      <span style="flex: 1"></span>
      <md-tabs>
        <md-tab id="tab-home" style="background: transparent" md-label="Editor"></md-tab>
        <md-tab id="tab-pages" md-label="Analytics"></md-tab>
      </md-tabs>
      <span style="flex: 1"></span>
      <md-button @click="run" class="md-icon-button md-raised run">
        <md-icon>play_arrow</md-icon>
      </md-button>&nbsp;&nbsp;
      <md-button @click="" class="md-icon-button md-raised">
        <md-icon>settings</md-icon>
      </md-button>
    </md-toolbar>
    <div id="content" class="md-layout">
      <SideMenu class="md-layout-item md-size-15" msg="Datasource"></SideMenu>
      <Editor class="md-size-85" msg=""></Editor>
    </div>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu.vue'
import Editor from './components/Editor.vue'
import { EventBus } from './main.js'

export default {
  name: 'app',
  components: {
    Editor,
    SideMenu
  },
  data: function() {
    return {
      message: 'test'
    };
  },
  methods: {
    run: () => {EventBus.$emit('runFlow', null)}
  }
}
</script>

<style>
html, body {
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
}

svg {
  display: block;
}

md-overlay {
  z-index: 0 !important;
}

.run .md-ripple {
  background-color: #75A035;
}

.md-tabs-navigation {
  background: #212121 !important;
}

.md-tabs .md-ripple {
  background: transparent;
}

.md-field.md-theme-default>.md-icon:after {
  background-color: #424242 !important;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}

#content {
  height: 100%;
}

.layout-sidemenu {
  -webkit-box-shadow: 3px 0px 5px 0px rgba(0,0,0,0.3);
  -moz-box-shadow: 3px 0px 5px 0px rgba(0,0,0,0.3);
  box-shadow: 3px 0px 5px 0px rgba(0,0,0,0.3);
  z-index: 100;
}

.layout-detailmenu {
  -webkit-box-shadow: -3px 0px 5px 0px rgba(0,0,0,0.3);
  -moz-box-shadow: -3px 0px 5px 0px rgba(0,0,0,0.3);
  box-shadow: -3px 0px 5px 0px rgba(0,0,0,0.3);
  z-index: 100;
}

.md-drawer {
  width: 300px !important;
}

.af-full-width {
  width: 100%;
}

.af-column-padding {
  padding: 0 12px;
}

.af-fab {
  position: absolute !important;
  z-index: 999;
  bottom: 10px;
  right: 10px;
  /*background-color: #39CF4E !important;*/
}
</style>
