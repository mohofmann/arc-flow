<template>
  <div class="md-content">
    <h4>Preprocessor</h4>
    <md-divider></md-divider>
    <br>
    <md-field>
      <label for="calculation">Calculation</label>
      <md-select v-model="preprocessorType">
        <md-option value="ENERGY">Energy</md-option>
      </md-select>
    </md-field>
    <md-field>
      <label for="inputs">Inputs</label>
      <md-select v-model="inputSize" @md-selected="updateInputs">
        <md-option v-for="size in sizeOptions" :value="size">{{ size }}</md-option>
      </md-select>
    </md-field>
  </div>
</template>

<script>
import { EventBus } from '../../main.js'

const updateInputs  = function () {

}

export default {
  name: 'MemoryMenu',
  props: {
    node: Object
  },
  data: function () {
    return {
      preprocessorType: 'ENERGY',
      inputSize: this.node.inputs.length,
      sizeOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  methods: {
    updateInputs: updateInputs
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
