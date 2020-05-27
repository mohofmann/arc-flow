<template>
  <div class="md-content">
    <h4>Feature Table</h4>
    <p><i>{{ node.description }}</i></p>
    <md-divider></md-divider>
    <br>
    <md-field>
      <md-icon>skip_previous</md-icon>
      <label for="fieldAmount">Table Size</label>
      <md-input v-model="tableSize" @keyup.native="updateTableSize"></md-input>
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

const updateTableSize = function () {
  this.node.config.tableSize = this.tableSize
}

export default {
  name: 'FeatureTableMenu',
  props: {
    node: Object
  },
  data: function () {
    return {
      tableSize: this.node.config.tableSize
    }
  },
  methods: {
    updateTableSize: updateTableSize
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
