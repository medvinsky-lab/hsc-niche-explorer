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
  height: {
    type: Number,
    default: 500,
  },
});

function getPointCategoryName(point, dimension) {
  var series = point.series,
    isY = dimension === "y",
    axis = series[isY ? "yAxis" : "xAxis"];
  return axis.categories[point[isY ? "y" : "x"]];
}

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
    plotBorderWidth: 1,
    height: props.height,
  },
  xAxis: {
    categories: axisLabels,
  },
  yAxis: {
    categories: axisLabels,
    title: null,
    reversed: true,
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
  series: [
    {
      borderWidth: 1,
      data: props.data.data,
      dataLabels: {
        enabled: true,
        color: "#000000",
      },
    },
  ],
});
</script>
<template><Chart :options="chartOptions"></Chart></template>
