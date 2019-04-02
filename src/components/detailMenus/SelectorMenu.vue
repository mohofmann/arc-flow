<template>
  <div class="md-content">
    <h4>Selector</h4>
    <p><i>{{ node.description }}</i></p>
    <md-divider></md-divider>
    <md-field>
      <label for="segmentAmount">Feature Type</label>
      <md-select v-model="selectedAttributes" @md-selected="updateSelection">
        <md-option v-for="attribute in attributes" :value="attribute"></md-option>
      </md-select>
    </md-field>
    <md-switch v-model="node.logging">Logging</md-switch>
  </div>
</template>

<script>
import { EventBus } from '../../main.js'

const updateSelection = function () {

}

export default {
  name: 'SelectorMenu',
  props: {
    node: Object
  },
  data: function () {
    return {
      attributes: this.node.attributes ? this.node.attributes : [],
      selectedAttributes: this.node.attributes
    }
  },
  methods: {
    updateSelection: updateSelection
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
