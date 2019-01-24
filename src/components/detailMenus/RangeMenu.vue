<template>
  <div class="md-content">
    <h4>Range</h4>
    <md-divider></md-divider>
    <br>
    <md-field :class="valid('queueSize') ? '' : 'md-invalid'">
      <label for="queueSize">Queue Size</label>
      <md-input type="number" v-model="queueSize" min="minQueueSize" @keyup.native="updateQueueSize"></md-input>
      <span class="md-error">Size needs to be bigger than total range</span>
    </md-field>
    <md-field>
      <md-icon>skip_previous</md-icon>
      <label for="fieldAmount">Range before Index</label>
      <md-input v-model="rangeBeforeIndex" @keyup.native="updateRange"></md-input>
    </md-field>
    <md-field>
      <md-icon>skip_next</md-icon>
      <label for="fieldAmount">Range after Index</label>
      <md-input v-model="rangeAfterIndex" @keyup.native="updateRange"></md-input>
    </md-field>
    <md-switch v-model="node.logging">Logging</md-switch>
  </div>
</template>

<script>
import { EventBus } from '../../main.js'

const updateQueueSize = function () {
  if (this.valid()) {
    this.node.updateNode(this.rangeBeforeIndex, this.rangeAfterIndex, this.queueSize)
  }
}

let minQueueSize = function () {
  return (parseInt(this.rangeBeforeIndex) + parseInt(this.rangeAfterIndex) + 1)
}

const updateRange = function () {
  let minQueueSize = this.minQueueSize()
  if (this.queueSize < minQueueSize) {
    this.queueSize = minQueueSize
  }
  this.node.updateNode(this.rangeBeforeIndex, this.rangeAfterIndex, this.queueSize)
}

const valid = function (field) {
  if (parseInt(this.queueSize) < this.minQueueSize()) {
    return false
  } else {
    return true
  }
}

export default {
  name: 'RangeMenu',
  props: {
    node: Object
  },
  data: function () {
    return {
      memoryType: 'RINGBUFFER',
      rangeBeforeIndex: this.node.rangeBeforeIndex,
      rangeAfterIndex: this.node.rangeAfterIndex,
      queueSize: this.node.queueSize
    }
  },
  methods: {
    updateRange: updateRange,
    updateQueueSize: updateQueueSize,
    valid: valid,
    minQueueSize: minQueueSize
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
