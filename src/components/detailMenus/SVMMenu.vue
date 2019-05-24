<template>
  <div class="md-content">
    <h4>Svm</h4>
    <p><i>{{ node.description }}</i></p>
    <md-divider></md-divider>
    <br>
    <!-- <md-field>
      <label for="segmentAmount">Feature Type</label>
      <md-select v-model="selectedFeature" @md-selected="updateFeature">
        <md-option v-for="feature in features" :value="feature">{{ feature }}</md-option>
      </md-select>
    </md-field> -->
    <md-switch v-model="node.logging">Logging</md-switch>
  </div>
</template>

<script>
import { EventBus } from '../../main.js'

export default {
  name: 'SVMMenu',
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
