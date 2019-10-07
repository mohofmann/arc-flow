<template>
  <!-- Sidebar -->
    <md-drawer class="af-column-padding md-right" :md-active.sync="nodeSelected" @md-closed="deselectNode">
      <Component v-bind:is="selectedNode && selectedNode.detailMenu" :node="selectedNode"></Component>
    </md-drawer>
</template>

<script>
import DataSourceMenu from './detailMenus/DataSourceMenu.vue'
import RingbufferMenu from './detailMenus/RingbufferMenu.vue'
import SqrMagnitudeMenu from './detailMenus/SqrMagnitudeMenu.vue'
import PeakDetectorMenu from './detailMenus/PeakDetectorMenu.vue'
import SegmentationMenu from './detailMenus/SegmentationMenu.vue'
import SegmentorMenu from './detailMenus/SegmentorMenu.vue'
import MeanExtractorMenu from './detailMenus/MeanExtractorMenu.vue'
/* PLOP: APPEND IMPORT */
import StartMenu from './detailMenus/StartMenu.vue'
import KNNMenu from './detailMenus/KNNMenu.vue'
import MaxMenu from './detailMenus/MaxMenu.vue'
import MinMenu from './detailMenus/MinMenu.vue'
import SVMMenu from './detailMenus/SVMMenu.vue'
import FeatureTableMenu from './detailMenus/FeatureTableMenu.vue'
import EventLabelerMenu from './detailMenus/EventLabelerMenu.vue'
import MagnitudeMenu from './detailMenus/MagnitudeMenu.vue'
import SplitterMenu from './detailMenus/SplitterMenu.vue'
import LogMenu from './detailMenus/LogMenu.vue'
import SelectorMenu from './detailMenus/SelectorMenu.vue'
import FeatureVectorMenu from './detailMenus/FeatureVectorMenu.vue'
import SmaExtractorMenu from './detailMenus/SmaExtractorMenu.vue'
import MedianExtractorMenu from './detailMenus/MedianExtractorMenu.vue'
import { EventBus } from '../main.js'

const setupEvents = function () {
  EventBus.$on('selectNode', node => {
    this.nodeSelected = true
    this.selectedNode = node
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
    RingbufferMenu,
    SqrMagnitudeMenu,
    PeakDetectorMenu,
    SegmentationMenu,
    SegmentorMenu,
    /* PLOP: APPEND COMPONENT */
    StartMenu,
    KNNMenu,
    MaxMenu,
    MinMenu,
    SVMMenu,
    FeatureTableMenu,
    EventLabelerMenu,
    MagnitudeMenu,
    SplitterMenu,
    LogMenu,
    SelectorMenu,
    FeatureVectorMenu,
    SmaExtractorMenu,
    MedianExtractorMenu,
    MeanExtractorMenu
  },
  data: function () {
    return {
      nodeSelected: false,
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
