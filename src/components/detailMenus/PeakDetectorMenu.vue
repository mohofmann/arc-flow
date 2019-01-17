<template>
  <div class="md-content">
    <h4>Peak Detector</h4>
    <md-divider></md-divider>
    <br>
    <md-field>
      <md-icon>change_history</md-icon>
      <label for="fieldAmount">Min Peak Height</label>
      <md-input v-model="minPeakHeight" @keyup.native="updateAttributes"></md-input>
    </md-field>
    <md-field>
      <md-icon>linear_scale</md-icon>
      <label for="fieldAmount">Min Peak Distance</label>
      <md-input v-model="minPeakDistance" @keyup.native="updateAttributes"></md-input>
    </md-field>
  </div>
</template>

<script>
import { EventBus } from '../../main.js'

const updateAttributes = function () {
  this.node.minPeakHeight = this.minPeakHeight
  this.node.minPeakDistance = this.minPeakDistance
}

export default {
  name: 'PeakDetectorMenu',
  props: {
    node: Object
  },
  data: function () {
    return {
      minPeakHeight: this.node.minPeakHeight,
      minPeakDistance: this.node.minPeakDistance
    }
  },
  methods: {
    updateAttributes: updateAttributes
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
