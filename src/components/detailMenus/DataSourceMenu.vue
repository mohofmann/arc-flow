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
      <label for="movies">Features</label>
      <md-select v-model="selectedFeatures" name="features" id="features" multiple>
        <md-option value="fight-club">Fight Club</md-option>
        <md-option value="godfather">Godfather</md-option>
        <md-option value="godfather-ii">Godfather II</md-option>
        <md-option value="godfather-iii">Godfather III</md-option>
        <md-option value="godfellas">Godfellas</md-option>
        <md-option value="pulp-fiction">Pulp Fiction</md-option>
        <md-option value="scarface">Scarface</md-option>
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
    }
  })
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
      selectedFeatures: []
    }
  },
  methods: {
    parseFile: parseFile,
    updateCountdown: countdownValue => {
      console.log(countdownValue)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
