<template>
  <div class="md-content">
    <h4>Log</h4>
    <p><i>{{ node.description }}</i></p>
    <md-divider></md-divider>
    <br>
    <md-field>
      <md-icon>view_comfy</md-icon>
      <label for="fieldAmount">Log Limit</label>
      <md-input v-model="maxLog" @keyup.native="updateAttributes"></md-input>
    </md-field>
  </div>
</template>

<script>
import { EventBus } from '../../main.js'

const updateAttributes  = function () {
  if (this.node) {
    this.node.maxLog = this.maxLog
  }
}

export default {
  name: 'LogMenu',
  props: {
    node: Object
  },
  data: function () {
    return {
      maxLog: this.node.maxLog
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
