<script setup>
import Highcharts from "highcharts";
import hcHeatmap from "highcharts/modules/heatmap";
import { Chart } from "highcharts-vue";
import { ref } from "vue";

hcHeatmap(Highcharts);

const props = defineProps({
  data: {
    type: Object,
  },
  ligand: {
    type: String,
  },
  receptor: {
    type: String,
  },
  height: {
    type: Number,
    default: 500,
  },
});

const axisLabels = props.data.axis.map((e) => {
  return e.label;
});

const chartOptions = ref({
  credits: {
    enabled: false,
  },
  title: {
    text: "",
  },
  chart: {
    type: "heatmap",
    height: props.height,
  },
  xAxis: {
    categories: axisLabels,
    gridLineWidth: 0,
    title: {
      text: "Receptor",
      style: {
        fontWeight: "bold",
      },
    },
  },
  yAxis: {
    categories: axisLabels,
    title: null,
    reversed: true,
    gridLineWidth: 0,
    title: {
      text: "Ligand",
      style: {
        fontWeight: "bold",
      },
    },
  },
  colorAxis: {
    stops: [
      [0, "#fef0d9"],
      [0.2, "#fdd49e"],
      [0.4, "#fdbb84"],
      [0.6, "#fc8d59"],
      [0.8, "#e34a33"],
      [1, "#b30000"],
    ],
  },
  legend: {
    align: "right",
    layout: "vertical",
    margin: 0,
    verticalAlign: "top",
    y: 25,
    symbolHeight: 280,
  },
  tooltip: {
    formatter() {
      const yLabel = this.series.yAxis.categories[this.point.y];
      const xLabel = this.series.xAxis.categories[this.point.x];
      return (
        `<strong>Ligand:</strong> ${xLabel}<br>` +
        `<strong>Receptor:</strong> ${yLabel}<br>` +
        `<strong>Value:</strong> ${this.point.value}`
      );
    },
  },
  series: [
    {
      borderRadius: 5,
      data: props.data.data,
      dataLabels: {
        enabled: true,
        color: "#000000",
      },
      colsize: 0.95,
      rowsize: 0.95,
      marker: {
        states: {
          select: {
            enabled: true,
            fillColor: undefined,
            lineWidth: 3,
            lineColor: "red",
          },
        },
      },
    },
  ],
});
</script>
<template><Chart ref="heatmap" :options="chartOptions"></Chart></template>
