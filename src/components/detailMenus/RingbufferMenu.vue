<template>
  <div class="md-content">
    <h4>Ringbuffer</h4>
    <p><i>{{ node.description }}</i></p>
    <md-divider></md-divider>
    <br>
    <md-field>
      <md-icon>view_comfy</md-icon>
      <label for="fieldAmount">Memory Fields</label>
      <md-input v-model="fieldAmount" @keyup.native="updateAttributes"></md-input>
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
      fieldAmount: this.node.fieldAmount
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
