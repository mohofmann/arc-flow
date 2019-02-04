<!-- <template>
  <div class="md-layout">
    adssddsfjlasdfjdf
  </div>
</template> -->

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

<!-- Add "scoped" attribute to limit CSS to this component only
<style scoped>

</style>
 -->