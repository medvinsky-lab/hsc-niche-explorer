<script setup>
import Heatmap from "./Heatmap.vue";
import { storeToRefs } from "pinia";
import { useDatasetStore } from "../stores/datasets";

import HeatmapDataCS13 from "../data/heatmaps/cs13.json";
import HeatmapDataCS14 from "../data/heatmaps/cs14.json";
import HeatmapDataCS16 from "../data/heatmaps/cs16.json";
import HeatmapDataUMAP from "../data/heatmaps/umap.json";

import { computed } from "@vue/reactivity";
import { ref, watch } from "vue";

const store = useDatasetStore();
const { activeDataset, activeLigand, activeReceptor, activePlotType } =
  storeToRefs(store);

const selectionActive = computed(() => {
  return [activeLigand.value, activeReceptor.value].every((e) => e != null);
});

const highcharts = ref(null);

watch(selectionActive, () => {
  if (selectionActive.value) {
    const chart = highcharts.value.$refs.heatmap.chart;
    const series = chart.series[0];
    const point = series.points[10];
    point.select(true, true);
  }
});
</script>
<template>
  <Heatmap
    ref="highcharts"
    v-if="activeDataset === 'cs13'"
    :data="HeatmapDataCS13"
  ></Heatmap>
  <Heatmap
    ref="highcharts"
    v-if="activeDataset === 'cs14'"
    :data="HeatmapDataCS14"
  ></Heatmap>
  <Heatmap
    ref="highcharts"
    v-if="activeDataset === 'cs16'"
    :data="HeatmapDataCS16"
  ></Heatmap>
  <Heatmap
    ref="highcharts"
    v-if="activeDataset === 'umap'"
    :data="HeatmapDataUMAP"
    :height="1000"
  ></Heatmap>
</template>
