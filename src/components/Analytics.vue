<template>
  <div id="analytics" class="md-layout content-height">
    <div id="logcontainer" ref="logcontainer" class="md-layout-item md-elevation-1 md-size-30">
      <p style="font-size: 16px; font-weight: 600;">ARCFLOW Console</p>
      <div id="log" ref="log"></div>
    </div>
    <div class="md-layout md-layout-item md-elevation-4 md-size-70">
      <div class="md-layout-item md-size-33" style="text-align: center; height: 100px;">
        <p style="font-size: 40px">{{ nodes }}</p>
        <p style="font-size: 20px">NODE AMOUNT</p>
      </div>
      <div class="md-layout-item md-size-33" style="text-align: center; height: 100px;">
        <p style="font-size: 40px">{{ executions }}</p>
        <p style="font-size: 20px">EXECUTIONS</p>
      </div>
      <div class="md-layout-item md-size-33" style="text-align: center; height: 100px;">
        <p style="font-size: 40px">{{ duration }} ms</p>
        <p style="font-size: 20px">EXECUTION TIME</p>
      </div>
      <div class="md-layout-item md-size-33" style="text-align: center; height: 100px;">
        <p style="font-size: 40px">-</p>
        <p style="font-size: 20px">EST. MEMORY</p>
      </div>
      <div class="md-layout-item md-size-33" style="text-align: center; height: 100px;">
        <p style="font-size: 40px">{{ accuracy }}</p>
        <p style="font-size: 20px">ACCURACY</p>
      </div>
      <div class="md-layout-item md-size-33" style="text-align: center; height: 100px;">
        <p style="font-size: 40px">-</p>
        <p style="font-size: 20px">FLOPS</p>
      </div>
      <div class="md-layout-item md-size-100" style="height: 20px"></div>
      <div class="md-layout-item md-size-15">
      </div>
      <div class="md-layout-item md-size-40" v-if="nodes > 30">
        <img src="../assets/dl.png" style="height: 300px">
        <p style="font-size: 20px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ACTIVITIES PER CLASS</p>
      </div>
      <div class="md-layout-item md-size-40" v-if="nodes > 30">
        <img src="../assets/dp2.png" style="height: 300px">
        <p style="font-size: 20px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PREDICTIONS</p>
      </div>
      <div class="md-layout-item md-size-25">
      </div>
     <!--  <canvas id="pieChart1" class="md-layout-item md-size-50" ref="pieChart1"></canvas>
      <canvas id="lineChart1" class="md-layout-item md-size-50" ref="lineChart1"></canvas>
      <canvas id="lineChart2" class="md-layout-item md-size-50" ref="lineChart2"></canvas>
      <canvas id="pieChart2" class="md-layout-item md-size-50" ref="pieChart2"></canvas> -->
    </div>
  </div>
</template>

<script>
import 'lodash'
import 'chart.js'
import { EventBus } from '../main.js'

const setupEvents = function () {
  EventBus.$on('renderDataChart', data => renderDataChart(data, this.dataChart))
  EventBus.$on('resetAnalytics', () => {
    this.$refs.logcontainer.scrollTop = 0;
  })
  EventBus.$on('doneExecuting', data => {
    this.duration = data.duration.getMilliseconds()
    this.nodes = data.nodes
    this.executions = data.executions
  })
  EventBus.$on('doneClassifying', accuracy => {
    this.accuracy = accuracy
  })
}

const setupCharts = function () {
//   const chartColors = {
//     blue: "rgb(54, 162, 235)",
//     green: "rgb(75, 192, 192)",
//     grey: "rgb(201, 203, 207)",
//     orange: "rgb(255, 159, 64)",
//     purple: "rgb(153, 102, 255)",
//     red: "rgb(255, 99, 132)",
//     yellow: "rgb(255, 205, 86)"
//   }

//   this.pieChart1 = this.$refs.pieChart1.getContext('2d')
//   this.lineChart1 = this.$refs.lineChart1.getContext('2d')
//   this.pieChart2 = this.$refs.pieChart2.getContext('2d')
//   this.lineChart2 = this.$refs.lineChart2.getContext('2d')

//   let pieConfig = {
//     type: 'doughnut',
//     data: {
//       datasets: [{
//         data: [
//           Math.round(Math.random() * 100),
//           Math.round(Math.random() * 100),
//           Math.round(Math.random() * 100)
//         ],
//         backgroundColor: [
//           chartColors.red,
//           chartColors.orange,
//           chartColors.yellow
//         ],
//         label: 'Dataset 1'
//       }],
//       labels: [
//         'Red',
//         'Orange',
//         'Yellow'
//       ]
//     },
//     options: {
//       responsive: true,
//       legend: {
//         position: 'right',
//       },
//       title: {
//         display: true,
//         text: 'Relative Memory'
//       },
//       animation: {
//         animateScale: true,
//         animateRotate: true
//       }
//     }
//   };

//   let polarConfig = {
//     type: 'polarArea',
//     data: {
//       datasets: [{
//         data: [
//           Math.round(Math.random() * 100),
//           Math.round(Math.random() * 100),
//           Math.round(Math.random() * 100),
//           Math.round(Math.random() * 100),
//           Math.round(Math.random() * 100),
//         ],
//         backgroundColor: [
//           chartColors.red,
//           chartColors.orange,
//           chartColors.yellow,
//           chartColors.green,
//           chartColors.blue
//         ],
//         label: 'My dataset' // for legend
//       }],
//       labels: [
//         'Red',
//         'Orange',
//         'Yellow',
//         'Green',
//         'Blue'
//       ]
//     },
//     options: {
//       responsive: true,
//       legend: {
//         position: 'right',
//       },
//       title: {
//         display: true,
//         text: 'Polar Area'
//       },
//       scale: {
//         ticks: {
//           beginAtZero: true
//         },
//         reverse: false
//       },
//       animation: {
//         animateRotate: false,
//         animateScale: true
//       }
//     }
  // };

//   new Chart(this.pieChart1, pieConfig)
//   new Chart(this.lineChart1, polarConfig)
//   new Chart(this.pieChart2, pieConfig)
//   new Chart(this.lineChart2, polarConfig)

}

let renderDataChart = function (data, dataChart) {
  // var chart = new Chart(dataChart, {
  //   // The type of chart we want to create
  //   type: 'line',

  //   // The data for our dataset
  //   data: {
  //     labels: ["", "", "",],
  //     datasets: [{
  //       label: "My First dataset",
  //       backgroundColor: 'rgb(255, 99, 132)',
  //       borderColor: 'rgb(255, 99, 132)',
  //       data: [0, 10, 5, 2, 20, 30, 45],
  //     }]
  //   },

  //   // Configuration options go here
  //   options: {}
  // });
}

export default {
  name: 'Analytics',
  props: {
    msg: String
  },
  data: function () {
    return {
      dataChart: null,
      duration: 0,
      nodes: 0,
      executions: 0,
      accuracy: 0
    }
  },
  methods: {
    
  },
  created: setupEvents,
  mounted: setupCharts
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#analytics {
  background-color: #161616;
}

#logcontainer {
  height: 100%;
  padding: 15px;
  overflow: scroll;
  background-color: #060606;
  font-family: 'Courier New';
  font-size: 10pt;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 5px #000000;
}

</style>
