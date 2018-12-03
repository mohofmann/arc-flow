<template>
  <div class="md-content">
    <h4>Memory</h4>
    <md-divider></md-divider>
    <br>
    <md-field>
      <label for="features">Memory Type</label>
      <md-select v-model="memoryType" name="type" id="type">
        <md-option value="RINGBUFFER">Ringbuffer</md-option>
      </md-select>
    </md-field>
    <md-field>
      <md-icon>view_comfy</md-icon>
      <label for="fieldAmount">Memory Fields</label>
      <md-input v-model="fieldAmount"></md-input>
    </md-field>
    <md-field>
      <md-icon>view_compact</md-icon>
      <label for="fieldSize">Field Size</label>
      <md-input v-model="fieldSize"></md-input>
    </md-field>
  </div>
</template>

<script>
import { EventBus } from '../../main.js'

const changeMemoryType = function () {
  // body...
}

export default {
  name: 'MemoryMenu',
  props: {
    node: Object
  },
  data: function () {
    return {
      memoryType: 'RINGBUFFER',
      memorySize: 256
    }
  },
  methods: {
    changeMemoryType: changeMemoryType
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
