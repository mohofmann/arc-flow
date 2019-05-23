<template>
  <div id="analytics" class="md-layout" style="height: auto%">
    <div id="log" ref="log" class="md-layout-item md-size-50" style="height: 100%; padding: 15px; overflow: scroll"></div>
    <div class="md-layout-item md-size-50">
      <canvas id="pieChart" ref="pieChart"></canvas>
      <canvas id="lineChart" ref="lineChart"></canvas>
    </div>
  </div>
</template>

<script>
import 'lodash'
import 'chart.js'
import { EventBus } from '../main.js'

const setupEvents = function () {
  EventBus.$on('renderDataChart', data => renderDataChart(data, this.dataChart))
}

const setupCharts = function () {
  const chartColors = {
    blue: "rgb(54, 162, 235)",
    green: "rgb(75, 192, 192)",
    grey: "rgb(201, 203, 207)",
    orange: "rgb(255, 159, 64)",
    purple: "rgb(153, 102, 255)",
    red: "rgb(255, 99, 132)",
    yellow: "rgb(255, 205, 86)"
  }

  this.pieChart = this.$refs.pieChart.getContext('2d')
  this.lineChart = this.$refs.lineChart.getContext('2d')

  let pieConfig = {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100)
        ],
        backgroundColor: [
          chartColors.red,
          chartColors.orange,
          chartColors.yellow
        ],
        label: 'Dataset 1'
      }],
      labels: [
        'Red',
        'Orange',
        'Yellow'
      ]
    },
    options: {
      responsive: true,
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Relative Memory'
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  };

  let polarConfig = {
    type: 'polarArea',
    data: {
      datasets: [{
        data: [
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100),
        ],
        backgroundColor: [
          chartColors.red,
          chartColors.orange,
          chartColors.yellow,
          chartColors.green,
          chartColors.blue
        ],
        label: 'My dataset' // for legend
      }],
      labels: [
        'Red',
        'Orange',
        'Yellow',
        'Green',
        'Blue'
      ]
    },
    options: {
      responsive: true,
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Polar Area'
      },
      scale: {
        ticks: {
          beginAtZero: true
        },
        reverse: false
      },
      animation: {
        animateRotate: false,
        animateScale: true
      }
    }
  };

  new Chart(this.pieChart, pieConfig)
  new Chart(this.lineChart, polarConfig)

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
      dataChart: null
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

</style>
