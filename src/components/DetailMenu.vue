<template>
  <!-- Sidebar -->
    <md-drawer class="af-column-padding md-right" :md-active.sync="nodeSelected" @md-closed="deselectNode">
      <Component v-bind:is="selectedNode && selectedNodeType+'Menu'" :node="selectedNode"></Component>
    </md-drawer>
</template>

<script>
import DataSourceMenu from './detailMenus/DataSourceMenu.vue'
import MemoryMenu from './detailMenus/MemoryMenu.vue'
import PreprocessorMenu from './detailMenus/PreprocessorMenu.vue'
import PeakDetectorMenu from './detailMenus/PeakDetectorMenu.vue'
import RangeMenu from './detailMenus/RangeMenu.vue'
import SegmentorMenu from './detailMenus/SegmentorMenu.vue'
import MeanExtractorMenu from './detailMenus/MeanExtractorMenu.vue'
/* PLOP: APPEND IMPORT */
import FeatureVectorMenu from './detailMenus/FeatureVectorMenu.vue'
import SmaExtractorMenu from './detailMenus/SmaExtractorMenu.vue'
import MedianExtractorMenu from './detailMenus/MedianExtractorMenu.vue'
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
  if (this) {
    this.nodeSelected = false
    this.selectedNode = null
    this.selectedNodeType = null
  }
}

export default {
  name: 'DetailMenu',
  components: {
    DataSourceMenu,
    MemoryMenu,
    PreprocessorMenu,
    PeakDetectorMenu,
    RangeMenu,
    SegmentorMenu,
    /* PLOP: APPEND COMPONENT */
    FeatureVectorMenu,
    SmaExtractorMenu,
    MedianExtractorMenu,
    MeanExtractorMenu
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
