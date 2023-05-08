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
const { activeDataset, activeLigand, activeReceptor } = storeToRefs(store);

const activeSelection = computed(() => {
  return [activeLigand.value, activeReceptor.value];
});

const heatmapData = computed(() => {
  if (activeDataset.value == "cs13") {
    return HeatmapDataCS13;
  }
  if (activeDataset.value == "cs14") {
    return HeatmapDataCS14;
  }
  if (activeDataset.value == "cs16") {
    return HeatmapDataCS16;
  }
  if (activeDataset.value == "umap") {
    return HeatmapDataUMAP;
  }
});

const highcharts = ref(null);
watch(activeSelection, () => {
  const selected = activeSelection.value.every((e) => e != null);
  const chart = highcharts.value.$refs.heatmap.chart;
  const series = chart.series[0];
  if (selected) {
    const ligandIndex = heatmapData.value.axis.findIndex((e) => {
      return e.id == activeLigand.value;
    });
    const receptorIndex = heatmapData.value.axis.findIndex((e) => {
      return e.id == activeReceptor.value;
    });
    series.points.forEach((point, index) => {
      if ((point.x === receptorIndex) & (point.y === ligandIndex)) {
        point.select();
      }
    });
  } else if (!selected) {
    series.points.forEach((point, index) => {
      if (point.selected) {
        point.select();
      }
    });
  }
});
</script>
<template>
  <div class="w-full">
    <Heatmap
      ref="highcharts"
      v-if="activeDataset === 'cs13'"
      :data="heatmapData"
    ></Heatmap>
    <Heatmap
      ref="highcharts"
      v-if="activeDataset === 'cs14'"
      :data="heatmapData"
    ></Heatmap>
    <Heatmap
      ref="highcharts"
      v-if="activeDataset === 'cs16'"
      :data="heatmapData"
    ></Heatmap>
    <Heatmap
      ref="highcharts"
      v-if="activeDataset === 'umap'"
      :data="heatmapData"
      :height="1000"
    ></Heatmap>
  </div>
</template>

<style>
.highcharts-container {
  @apply mx-auto;
}
</style>
