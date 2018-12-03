<template>
  <div class="md-content">
    <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showAlert" md-persistent>
      <span>CSV file successfully parsed.</span>
    </md-snackbar>
    <h4>Data Source</h4>
    <md-field>
      <label>Upload CSV</label>
      <md-file @md-change="parseFile" style="max-width: 100% !important"/>
    </md-field>
    <md-divider></md-divider>
    <md-field>
      <label for="features">Features</label>
      <md-select v-model="selectedFeatures" name="features" id="features" multiple @md-selected="updateSelection">
        <md-option v-for="feature in features" :value="feature">{{ feature }}</md-option>
      </md-select>
    </md-field>
  </div>
</template>

<script>
import { EventBus } from '../../main.js'
import Papa from 'papaparse'

const parseFile = function (fileList) {
  const file = fileList[0]
  Papa.parse(file, {
    complete: result => {
      this.showAlert = true
      this.node.setData(result)
      this.features = result.data[0]
      this.selectedFeatures = this.features.slice(0,3)
    }
  })
}

const updateSelection = function () {
  if (this.node) {
    this.node.setFeatures(this.selectedFeatures)
  }
}

export default {
  name: 'DataSourceMenu',
  props: {
    node: Object
  },
  data: function () {
    return {
      file: null,
      showAlert: false,
      features: [],
      selectedFeatures: []
    }
  },
  methods: {
    parseFile: parseFile,
    updateSelection: updateSelection
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
