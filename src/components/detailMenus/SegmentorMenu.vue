<template>
  <div class="md-content">
    <h4>Segmentor</h4>
    <md-divider></md-divider>
    <br>
    <md-field>
      <label for="segmentAmount">Amount of Segments</label>
      <md-select v-model="segmentAmount" @md-selected="updateSegmentAmount">
        <md-option v-for="amount in amountOptions" :value="amount">{{ amount }}</md-option>
      </md-select>
    </md-field>
    <md-field v-for="(segment, index) in segments" :class="validSegment(index) ? '' : 'md-invalid'">
      <!-- <md-icon>skip_previous</md-icon> -->
      <label for="segmentRange">Segment {{ index + 1 }} Start</label>
      <md-input v-model="segment.start" @keyup.native="updateAttributes"></md-input>
      <span class="md-error">Segments overlap</span>
    </md-field>
    <md-switch v-model="node.logging">Logging</md-switch>
  </div>
</template>

<script>
import { EventBus } from '../../main.js'

const updateAttributes = function () {
  if (this.allSegmentsValid()) {
    this.node.segments = this.segments
  }
}

const updateSegmentAmount = function () {
  if (this.node.segmentAmount != this.segmentAmount) {
    this.segments = []
    _.times(this.segmentAmount, i => {
      let segment = {start: i*100}
      this.segments.push(segment)
    })
    this.node.updateSegmentAmount(this.segmentAmount)
  }
}

const allSegmentsValid = function () {
  let allValid = true
  _.times(this.segmentAmount, i => {
    if (!this.validSegment(i)) allValid = false
  })
  return allValid
}

const validSegment = function (segmentIndex) {
  let valid = true
  if (this.segments[segmentIndex - 1]) {
    if (parseInt(this.segments[segmentIndex].start) <= parseInt(this.segments[segmentIndex - 1].start)) {
      valid = false
    }
  }
  return valid
}


export default {
  name: 'SegmentorMenu',
  props: {
    node: Object
  },
  data: function () {
    return {
      segmentAmount: this.node.segmentAmount,
      segments: this.node.segments,
      amountOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  methods: {
    updateSegmentAmount: updateSegmentAmount,
    updateAttributes: updateAttributes,
    allSegmentsValid: allSegmentsValid,
    validSegment: validSegment
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
