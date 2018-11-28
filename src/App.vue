<template>
  <div id="app" class="md-layout">
    <SideMenu class="md-layout-item md-size-15 af-column-padding" msg="Datasource"></SideMenu>
    <Editor class="md-size-85" msg=""></Editor>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu.vue'
import Editor from './components/Editor.vue'

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
  }
}
</script>

<style>
html, body {
  height: 100%;
}

svg {
  display: block;
}

md-overlay {
  z-index: 0 !important;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
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
</style>
