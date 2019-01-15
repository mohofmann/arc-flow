<template>
  <!-- Sidebar -->
    <md-drawer class="af-column-padding md-right" :md-active.sync="nodeSelected" @md-closed="deselectNode">
      <DataSourceMenu :node="selectedNode" v-if="selectedNodeType == 'DataSource'">
      </DataSourceMenu>
      <MemoryMenu :node="selectedNode" v-if="selectedNodeType == 'Memory'">
      </MemoryMenu>
      <!-- <Component v-bind:is="selectedNodeType+'Menu'" :node="selectedNode"></Component> -->
    </md-drawer>
</template>

<script>
import DataSourceMenu from './detailMenus/DataSourceMenu.vue'
import MemoryMenu from './detailMenus/MemoryMenu.vue'
import { EventBus } from '../main.js'

const setupEvents = function () {
  EventBus.$on('selectNode', node => {
    this.nodeSelected = true
    this.selectedNode = node
    this.selectedNodeType = node.constructor.name
  })
  EventBus.$on('deselectNode', node => {
    deselectNode();
  })
}

let deselectNode = function () {
  console.log("deselectiooon");
  this.nodeSelected = false
  this.selectedNode = null
  this.selectedNodeType = null
}

export default {
  name: 'DetailMenu',
  components: {
    DataSourceMenu,
    MemoryMenu
  },
  data: function () {
    return {
      nodeSelected: false,
      selectedNodeType: null,
      selectedNode: null
    };
  },
  methods: {
    deselectNode: deselectNode
  },
  created: setupEvents
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
