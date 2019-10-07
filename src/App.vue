<template>
  <div id="app">
    <Header></Header>
    <div id="content" class="md-layout md-layout-item md-size-100">
      <SideMenu class="md-layout-item md-size-20" msg="Datasource" v-show="showEditor"></SideMenu>
      <Editor class="md-layout-item md-size-80" v-show="showEditor" msg=""></Editor>
      <Analytics class="md-layout-item md-size-100" v-show="!showEditor"></Analytics>
      <!-- TODO: See how to fix SVG render bug when container is display: none -->
      <!-- <div class="md-layout-item md-size-85" style="position: relative">
        <Editor class="editor" msg=""></Editor>
        <Analytics :class="!showEditor ? 'af-foreground' : 'af-background'"></Analytics>
      </div> -->
    </div>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu.vue'
import Editor from './components/Editor.vue'
import Header from './components/Header.vue'
import Analytics from './components/Analytics.vue'
import { EventBus } from './main.js'

const setupEvents = function () {
  EventBus.$on('switchTab', tab => {
    if (tab == "editor-tab") {
      this.showEditor = true
    } else {
      this.showEditor = false
    }
  })
}

const setupKeybindings = function () {
  document.addEventListener('keydown', e => {
    switch (e.key) {
      case "e": EventBus.$emit('setTab', 'editor-tab'); break;
      case "a": EventBus.$emit('setTab', 'analytics-tab'); break;
      default: break;
    }
  })
}

export default {
  name: 'App',
  components: {
    Editor,
    SideMenu,
    Header,
    Analytics
  },
  data: function() {
    return {
      message: 'test',
      showEditor: true
    }
  },
  methods: {
    run: () => {EventBus.$emit('runFlow', null)},
    setupEvents: setupEvents,
    setupKeybindings: setupKeybindings
  },
  created: function () {
    this.setupEvents();
    this.setupKeybindings();
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

.content-height {
  height: calc(100% - 64px);
  height: -o-calc(100% - 64px); /* opera */
  height: -webkit-calc(100% - 64px); /* google, safari */
  height: -moz-calc(100% - 64px); /* firefox */
}

.run .md-ripple {
  background-color: #75A035;
}

.md-tabs-navigation {
  background: #212121 !important;
}

.md-tab {
  color: #FFFFFF;
}

.md-tabs-indicator {
  background-color: #FFFFFF !important;
}

.md-tabs .md-ripple {
  background: transparent;
  color: #BBBBBB;
}

.md-tabs .md-active .md-ripple {
  background: transparent;
  color: #FFFFFF;
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

.md-list-item-content {
  min-height: 40px !important;
  height: 40px !important;
}

.layout-detailmenu {
  -webkit-box-shadow: -3px 0px 5px 0px rgba(0,0,0,0.3);
  -moz-box-shadow: -3px 0px 5px 0px rgba(0,0,0,0.3);
  box-shadow: -3px 0px 5px 0px rgba(0,0,0,0.3);
  z-index: 100;
}

.md-drawer {
  width: 250px !important;
}

.af-full-width {
  width: 100%;
}

.af-column-padding {
  padding: 0 12px;
}

/*.editor {
  position: absolute;
  width: 100%;
  height: 100%;
}

.af-foreground {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 100 !important;
}

.af-background {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -2 !important;
}*/

.af-fab {
  position: absolute !important;
  z-index: 999;
  bottom: 10px;
  right: 10px;
  /*background-color: #39CF4E !important;*/
}
</style>
