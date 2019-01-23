<template>
  <div class="md-content">
    <h4>Range</h4>
    <md-divider></md-divider>
    <br>
    <md-field>
      <md-icon>skip_previous</md-icon>
      <label for="fieldAmount">Range before Index</label>
      <md-input v-model="rangeBeforeIndex" @keyup.native="updateAttributes"></md-input>
    </md-field>
    <md-field>
      <md-icon>skip_next</md-icon>
      <label for="fieldAmount">Range after Index</label>
      <md-input v-model="rangeAfterIndex" @keyup.native="updateAttributes"></md-input>
    </md-field>
    <md-switch v-model="node.logging">Logging</md-switch>
  </div>
</template>

<script>
import { EventBus } from '../../main.js'

const updateAttributes  = function () {
  this.node.updateNode(this.rangeBeforeIndex, this.rangeAfterIndex)
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
      rangeAfterIndex: this.node.rangeAfterIndex
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
