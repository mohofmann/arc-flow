<template>
  <div class="md-content">
    <h4>Feature Vector</h4>
    <p><i>{{ node.description }}</i></p>
    <md-divider></md-divider>
    <br>
    <md-field>
      <label for="featureAmount">Feature Amount</label>
      <md-select v-model="featureAmount" @md-selected="updateFeatureAmount">
        <md-option v-for="amount in amounts" :value="amount">{{ amount }}</md-option>
      </md-select>
    </md-field>
    <md-switch v-model="node.logging">Logging</md-switch>
  </div>
</template>

<script>
import { EventBus } from '../../main.js'

const updateFeatureAmount = function () {
  this.node.updateFeatureAmount(this.featureAmount)
}

export default {
  name: 'FeatureVectorMenu',
  props: {
    node: Object
  },
  data: function () {
    return {
      featureAmount: this.node.config.featureAmount,
      amounts: [1,2,3,4,5,6,7,8,9,10]
    }
  },
  methods: {
    updateFeatureAmount: updateFeatureAmount
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
