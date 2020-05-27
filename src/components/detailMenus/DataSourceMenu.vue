<template>
  <div class="md-content">
    <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showAlert" md-persistent>
      <span>CSV file successfully parsed.</span>
    </md-snackbar>
    <h4>Data Source</h4>
    <p><i>{{ node.description }}</i></p>
    <md-divider></md-divider>
    <md-field>
      <label>Upload CSV</label>
      <md-file @md-change="parseFile" :placeholder="fileName" style="max-width: 100% !important"/>
    </md-field>
    <md-switch v-model="node.logging">Logging</md-switch>
  </div>
</template>

<script>
import Papa from 'papaparse'
import { set } from 'idb-keyval'

const parseFile = function (fileList) {
  if (fileList) {
    const file = fileList[0]
    Papa.parse(file, {
      dynamicTyping: true,
      complete: result => {
        this.showAlert = true
        this.node.setData(result)
        this.node.name = file.name
        // TODO: Fix saving/loading so it doesn't require uploading the csv once
        set('samples', result)
          .then(() => console.log("Samples saved"))
          .catch(err => console.log("Saving samples failed", err))
        // localStorage.setItem('tmpData', JSON.stringify(result))
      }
    })
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
      // features: this.node.config.data ? this.node.config.data.data[0] : [],
      features: this.node.config.data ? this.node.config.data[0] : [],
      fileName: this.node.name
    }
  },
  methods: {
    parseFile: parseFile
  },
  created: function () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
