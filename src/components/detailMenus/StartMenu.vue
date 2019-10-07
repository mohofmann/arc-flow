<template>
  <div class="md-content">
    <h4>Start</h4>
    <p><i>{{ node.description }}</i></p>
    <md-divider></md-divider>
    <br>
    <md-field>
      <md-icon>skip_previous</md-icon>
      <label for="fieldAmount">Clock Count</label>
      <md-input v-model="count" @keyup.native="updateCount"></md-input>
    </md-field>
    <md-switch v-model="node.logging">Logging</md-switch>
  </div>
</template>

<script>
import { EventBus } from '../../main.js'

const updateCount = function () {
  this.node.config.count = this.count
}

export default {
  name: 'StartMenu',
  props: {
    node: Object
  },
  data: function () {
    return {
      count: this.node.config.count
    }
  },
  methods: {
    updateCount: updateCount
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
