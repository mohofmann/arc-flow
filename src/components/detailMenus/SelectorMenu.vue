<template>
  <div class="md-content">
    <h4>Selector</h4>
    <p><i>{{ node.description }}</i></p>
    <md-divider></md-divider>
    <md-field>
      <label for="segmentAmount">Feature Type</label>
      <md-select v-model="selectedAttributes" @md-selected="updateSelection" multiple>
        <md-option v-for="attribute in attributes" :value="attribute">{{ attribute }}</md-option>
      </md-select>
    </md-field>
    <md-switch v-model="node.logging">Logging</md-switch>
  </div>
</template>

<script>
import { EventBus } from '../../main.js'

const updateSelection = function () {
  this.node.setAttributes(this.attributes, this.selectedAttributes)
}

const getAttributes = function () {
  let attributes = this.node.getAttributes()
  this.attributes = attributes
}

export default {
  name: 'SelectorMenu',
  props: {
    node: Object
  },
  data: function () {
    return {
      attributes: [],
      selectedAttributes: this.node.config.selectedAttributes ? this.node.config.selectedAttributes : []
    }
  },
  methods: {
    updateSelection: updateSelection
  },
  created: getAttributes
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
