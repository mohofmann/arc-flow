<template>
  <div class="md-content">
    <h4>Memory</h4>
    <md-divider></md-divider>
    <br>
    <md-field>
      <label for="features">Memory Type</label>
      <md-select v-model="memoryType">
        <md-option value="RINGBUFFER">Ringbuffer</md-option>
      </md-select>
    </md-field>
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
  </div>
</template>

<script>
import { EventBus } from '../../main.js'

const changeMemoryType = function () {
  // body...
}

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
      memoryType: 'RINGBUFFER',
      fieldAmount: 256,
      fieldSize: 0,
      sizeOptions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  methods: {
    changeMemoryType: changeMemoryType,
    updateAttributes: updateAttributes
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
