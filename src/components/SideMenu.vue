<template>
  <nav id="sideMenu" style="height: 100%; overflow: scroll;">
    <!-- <md-toolbar style="background-color: #424242" :md-elevation="1">
      <md-field>
        <md-icon>search</md-icon>
        <label>Search Nodes</label>
        <md-input v-model="search"></md-input>
      </md-field>
    </md-toolbar> -->
      <br>
      <md-list style="background-color: #303030">
        <md-subheader>Data</md-subheader>
          <md-list-item @click="createNode('DATASOURCE')">
            <md-icon>notes</md-icon>
            <span class="md-list-item-text">{{ msg }}</span>
          </md-list-item>
          <md-list-item @click="createNode('SELECTOR')">
            <md-icon>notes</md-icon>
            <span class="md-list-item-text">Selector</span>
          </md-list-item>
        <md-divider></md-divider>
        <md-subheader>Memory</md-subheader>
          <md-list-item @click="createNode('RINGBUFFER')">
            <md-icon>data_usage</md-icon>
            <span class="md-list-item-text">Ring Buffer</span>
          </md-list-item>
          <md-list-item @click="createNode('SEGMENTATION')">
            <md-icon>data_usage</md-icon>
            <span class="md-list-item-text">Segmentation</span></md-list-item>
        <md-divider></md-divider>
        <md-subheader>Preprocessing</md-subheader>
          <md-list-item @click="createNode('MAGNITUDE')">
            <md-icon>trending_up</md-icon>
            <span class="md-list-item-text">Magnitude</span>
          </md-list-item>
          <md-list-item @click="createNode('SQRMAGNITUDE')">
            <md-icon>trending_up</md-icon>
            <span class="md-list-item-text">Sq. Magnitude</span>
          </md-list-item>
        <md-divider></md-divider>
        <md-subheader>Peak Detection</md-subheader>
          <md-list-item @click="createNode('PEAKDETECTOR')">
            <md-icon>change_history</md-icon>
            <span class="md-list-item-text">Simple</span>
          </md-list-item>
        <md-divider></md-divider>
        <md-subheader>Segmentation</md-subheader>
          <md-list-item @click="createNode('SEGMENTOR')">
            <md-icon>view_week</md-icon>
            <span class="md-list-item-text">Segmentor</span>
          </md-list-item>
        <md-divider></md-divider>
        <md-subheader>Feature Extraction</md-subheader>
          <md-list-item @click="createNode('MEANEXTRACTOR')">
            <md-icon>gps_fixed</md-icon>
            <span class="md-list-item-text">Mean Extractor</span>
          </md-list-item>
          <md-list-item @click="createNode('MEDIANEXTRACTOR')">
            <md-icon>gps_fixed</md-icon>
            <span class="md-list-item-text">Median Extractor</span>
          </md-list-item>
          <md-list-item @click="createNode('SMAEXTRACTOR')">
            <md-icon>gps_fixed</md-icon>
            <span class="md-list-item-text">SMA Extractor</span>
          </md-list-item>
          <md-list-item @click="createNode('FEATUREVECTOR')">
            <md-icon>gps_fixed</md-icon>
            <span class="md-list-item-text">Feature Vector</span>
          </md-list-item>
        <md-divider></md-divider>
        <md-subheader>Misc</md-subheader>
          <!-- PLOP: APPEND -->
					<md-list-item @click="createNode('EVENTLABELER')">
					  <md-icon>extension</md-icon>
					  <span class="md-list-item-text">Event Labeler</span>
					</md-list-item>
					<md-list-item @click="createNode('SPLITTER')">
					  <md-icon>extension</md-icon>
					  <span class="md-list-item-text">Splitter</span>
					</md-list-item>
					<md-list-item @click="createNode('LOG')">
					  <md-icon>extension</md-icon>
					  <span class="md-list-item-text">Log</span>
					</md-list-item>
      </md-list>
      <br><br><br><br><br><br>
  </nav>
</template>

<script>
import { EventBus } from '../main.js'

export default {
  name: 'SideMenu',
  props: {
    msg: String
  },
  data: function () {
    return {
      inputString: '',
      search: ''
    };
  },
  methods: {
    createNode: nodeName => {
      EventBus.$emit('createNode', nodeName)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .md-subheader {
    margin-top: 20px;
    min-height: 0;
    /*padding: 16px 0 0 0 !important;*/
  }

  .md-button {
    margin: 12px 0;
  }

</style>
