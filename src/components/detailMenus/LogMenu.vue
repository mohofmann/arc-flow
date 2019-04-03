<template>
  <div class="md-content">
    <h4>Log</h4>
    <p><i>{{ node.description }}</i></p>
    <md-divider></md-divider>
    <br>
  </div>
</template>

<script>
import { EventBus } from '../../main.js'

export default {
  name: 'LogMenu',
  props: {
    node: Object
  },
  data: function () {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
