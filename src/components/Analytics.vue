<template>
  <div id="analytics" class="md-layout">
    <div id="log" ref="log" class="md-layout-item md-size-50" style="padding: 15px; overflow: scroll"></div>
    <div class="md-layout"></div>
  </div>
</template>

<script>
import 'lodash'
import { EventBus } from '../main.js'

const setupEditor = function () {
  
}

const setupEvents = function () {
  // EventBus.$on('runFlow', this.run)
}

const run = function () {

}

export default {
  name: 'Analytics',
  props: {
    msg: String
  },
  data: function () {
    return {
      showError: false,
      showProgress: false,
      showSuccess: false
    }
  },
  methods: {
    run: run
  },
  mounted: setupEditor,
  created: setupEvents
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#analytics {
  background-color: #161616;
}

</style>
