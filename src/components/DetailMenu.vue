<template>
  <div class="wrapper">
    <!-- Sidebar -->
    <nav id="sidebar">

    </nav>
  </div>
</template>

<script>
import { EventBus } from '../main.js'

const setupEvents = function () {
  EventBus.$on('selectNode', node => nodeDetails(node))
}

const nodeDetails = function (node) {
  console.log(node + " got clicked")
}

export default {
  name: 'DetailMenu',
  props: {
    msg: String
  },
  data: function () {
    return {
      inputString: ''
    };
  },
  methods: {
  },
  created: setupEvents
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
