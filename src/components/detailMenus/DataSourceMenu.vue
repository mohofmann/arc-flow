<template>
  <div class="md-content">
    <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showAlert" md-persistent>
      <span>CSV file successfully parsed.</span>
    </md-snackbar>
    <h4>Data Source</h4>
    <md-field>
      <label>Upload CSV</label>
      <md-file @md-change="parseFile" :placeholder="fileName" style="max-width: 100% !important"/>
    </md-field>
    <md-divider></md-divider>
    <md-field>
      <label for="features">Features</label>
      <md-select :disabled="!features.toString()" v-model="selectedFeatures" name="features" id="features" multiple @md-selected="updateSelection">
        <md-option v-for="feature in features" :data="feature" :key="feature" :value="feature">{{ feature }}</md-option>
      </md-select>
    </md-field>
    <md-switch v-model="node.logging">Logging</md-switch>
  </div>
</template>

<script>
import Papa from 'papaparse'

const parseFile = function (fileList) {
  if (fileList) {
    const file = fileList[0]
    Papa.parse(file, {
      complete: result => {
        this.showAlert = true
        this.node.setData(result)
        localStorage.setItem('tmpData', JSON.stringify(result))
        this.node.name = file.name
        this.features = result.data[0]
        this.selectedFeatures = this.features.slice(0,3)
      }
    })
  }
}

const updateSelection = function () {
  if (this.selectedFeatures == this.node.features) return
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
      showAlert: false,
      features: this.node.data ? this.node.data.data[0] : [],
      selectedFeatures: this.node.features,
      fileName: this.node.name
    }
  },
  methods: {
    parseFile: parseFile,
    updateSelection: updateSelection
  },
  created: function () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
