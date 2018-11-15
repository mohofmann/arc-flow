<template>
  <div id="app">
    <b-container fluid class="layout-container h-100">
      <b-row class="h-100">
        <b-col cols="5" lg="2" sm="3" class="layout-sidemenu">
          <SideMenu msg="New Datasource"></SideMenu>
        </b-col>
        <b-col class="layout-editor">
          <Editor msg=""></Editor>
        </b-col>
      </b-row>
    </b-container>
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

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.layout-sidemenu {
  background-color: #444444;
  -webkit-box-shadow: 3px 0px 5px 0px rgba(0,0,0,0.3);
  -moz-box-shadow: 3px 0px 5px 0px rgba(0,0,0,0.3);
  box-shadow: 3px 0px 5px 0px rgba(0,0,0,0.3);
  z-index: 100;
}

.layout-detailmenu {
  background-color: #444444;
  -webkit-box-shadow: -3px 0px 5px 0px rgba(0,0,0,0.3);
  -moz-box-shadow: -3px 0px 5px 0px rgba(0,0,0,0.3);
  box-shadow: -3px 0px 5px 0px rgba(0,0,0,0.3);
  z-index: 100;
}

.layout-editor {
  padding: 0;
  /*background-color: #222222;
  background-size: 20px 20px, 20px 20px;
  background-position: -1px -1px, -1px -1px;
  background-image: -webkit-linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
                    -webkit-linear-gradient(0, rgba(255,255,255,.05) 1px, transparent 1px);
  background-image: -moz-linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
                    -moz-linear-gradient(0, rgba(255,255,255,.05) 1px, transparent 1px);
  background-image: linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);*/
}
</style>
