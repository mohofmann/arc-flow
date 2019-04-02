<template>
  <div class="md-content">
    <h4>Ringbuffer</h4>
    <md-divider></md-divider>
    <br>
    <md-field>
      <label for="fieldSize">Field Size</label>
      <md-select v-model="fieldSize" @md-selected="updateAttributes">
        <md-option v-for="size in sizeOptions" :value="size">{{ size }}</md-option>
      </md-select>
    </md-field>
    <md-field>
      <md-icon>view_comfy</md-icon>
      <label for="fieldAmount">Memory Fields</label>
      <md-input v-model="fieldAmount" @keyup.native="updateAttributes"></md-input>
    </md-field>
    <md-field>
      <md-icon>linear_scale</md-icon>
      <label for="fieldAmount">Output Range</label>
      <md-input v-model="outputRange" @keyup.native="updateAttributes"></md-input>
    </md-field>
    <md-switch v-model="node.logging">Logging</md-switch>
  </div>
</template>

<script>
import { EventBus } from '../../main.js'

const updateAttributes  = function () {
  if (this.node) {
    this.node.updateNode(this.fieldSize, this.fieldAmount)
  }
}

export default {
  name: 'MemoryMenu',
  props: {
    node: Object
  },
  data: function () {
    return {
      fieldAmount: this.node.fieldAmount,
      fieldSize: this.node.fieldSize,
      outputRange: 0,
      sizeOptions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
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
