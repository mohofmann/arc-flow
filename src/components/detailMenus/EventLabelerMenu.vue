<template>
  <div class="md-content">
    <h4>Event Labeler</h4>
    <p><i>{{ node.description }}</i></p>
    <md-divider></md-divider>
    <md-field>
      <label>Upload CSV with labels</label>
      <md-file @md-change="parseFile" :placeholder="fileName" style="max-width: 100% !important"/>
    </md-field>
    <!-- <md-field>
      <label for="segmentAmount">Feature Type</label>
      <md-select v-model="selectedFeature" @md-selected="updateFeature">
        <md-option v-for="feature in features" :value="feature">{{ feature }}</md-option>
      </md-select>
    </md-field> -->
    <md-switch v-model="node.logging">Logging</md-switch>
  </div>
</template>

<script>
import { EventBus } from '../../main.js'
import Papa from 'papaparse'
import { set } from 'idb-keyval'

const parseFile = function (fileList) {
  if (fileList) {
    const file = fileList[0]
    Papa.parse(file, {
      header: true,
      complete: result => {
        this.showAlert = true
        this.node.setData(result)
        this.node.name = file.name
        // TODO: Fix saving/loading so it doesn't require uploading the csv once
        set('labels', result)
          .then(() => console.log("Labels saved"))
          .catch(err => console.log("Saving labels failed", err))
      }
    })
  }
}

export default {
  name: 'EventLabelerMenu',
  props: {
    node: Object
  },
  data: function () {
    return {
      showAlert: false,
      fileName: this.node.name
    }
  },
  methods: {
    parseFile: parseFile
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
