<template>
  <!-- Sidebar -->
  <md-drawer class="md-right" :md-active.sync="nodeSelected">
    <DataSourceMenu :node="selectedNode" v-show="selectedNodeType == 'DataSource'"></DataSourceMenu>
  </md-drawer>
</template>

<script>
import DataSourceMenu from './detailMenus/DataSourceMenu.vue'
import { EventBus } from '../main.js'

const setupEvents = function () {
  EventBus.$on('selectNode', node => {
    this.nodeSelected = true
    this.selectedNode = node
    this.selectedNodeType = node.constructor.name
  })
  EventBus.$on('deselectNode', node => {
    this.nodeSelected = true
    this.selectedNode = null
    this.selectedNodeType = null
  })
}

export default {
  name: 'DetailMenu',
  components: {
    DataSourceMenu
  },
  data: function () {
    return {
      nodeSelected: false,
      selectedNodeType: null,
      selectedNode: null
    };
  },
  methods: {
  },
  created: setupEvents
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
