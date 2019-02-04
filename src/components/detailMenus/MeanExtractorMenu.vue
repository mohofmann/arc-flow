<template>
  <div class="md-content">
    <h4>Mean Extractor</h4>
    <md-divider></md-divider>
    <br>
    <md-switch v-model="node.logging">Logging</md-switch>
  </div>
</template>

<script>
import { EventBus } from '../../main.js'

export default {
  name: 'MeanExtractorMenu',
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
