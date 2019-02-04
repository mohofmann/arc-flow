<template>
  <div class="md-content">
    <h4>Mean Extractor</h4>
    <md-divider></md-divider>
    <br>
    <md-field>
      <label for="segmentAmount">Feature Type</label>
      <md-select v-model="selectedFeature" @md-selected="updateFeature">
        <md-option v-for="feature in features" :value="feature">{{ feature }}</md-option>
      </md-select>
    </md-field>
    <md-switch v-model="node.logging">Logging</md-switch>
  </div>
</template>

<script>
import { EventBus } from '../../main.js'

const updateFeature = function () {
  this.node.updateFeature(this.selectedFeature)
}

export default {
  name: 'MeanExtractorMenu',
  props: {
    node: Object
  },
  data: function () {
    return {
      selectedFeature: this.node.feature,
      features: ['MEAN']
    }
  },
  methods: {
    updateFeature: updateFeature
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
