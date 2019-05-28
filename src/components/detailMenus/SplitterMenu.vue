<template>
  <div class="md-content">
    <h4>Splitter</h4>
    <p><i></i></p>
    <md-divider></md-divider>
    <br>
    <md-field>
      <label for="outputs">Amount of Outputs</label>
      <md-select v-model="outputs" @md-selected="updateOutputs">
        <md-option v-for="output in outputOptions" :value="output">{{ output }}</md-option>
      </md-select>
    </md-field>
    <md-switch v-model="node.logging">Logging</md-switch>
  </div>
</template>

<script>
import { EventBus } from '../../main.js'

const updateOutputs = function () {
  this.node.updateOutputs(this.outputs)
}

export default {
  name: 'SplitterMenu',
  props: {
    node: Object
  },
  data: function () {
    return {
      outputs: this.node.outputs.length ? this.node.outputs.length : 2,
      outputOptions: [1,2,3,4,5,6,7,8,9,10]
    }
  },
  methods: {
    updateOutputs: updateOutputs
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
