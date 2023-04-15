<script setup>
import Heatmap from "./Heatmap.vue";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { useDatasetStore } from "../stores/datasets";

import HeatmapDataCS13 from "../data/heatmaps/cs13.json";
import HeatmapDataCS14 from "../data/heatmaps/cs14.json";
import HeatmapDataCS16 from "../data/heatmaps/cs16.json";
import HeatmapDataUMAP from "../data/heatmaps/umap.json";

const store = useDatasetStore();
const { activeDataset } = storeToRefs(store);
</script>
<template>
  <Heatmap v-if="activeDataset === 'cs13'" :data="HeatmapDataCS13"></Heatmap>
  <Heatmap v-if="activeDataset === 'cs14'" :data="HeatmapDataCS14"></Heatmap>
  <Heatmap v-if="activeDataset === 'cs16'" :data="HeatmapDataCS16"></Heatmap>
  <Heatmap
    v-if="activeDataset === 'umap'"
    :data="HeatmapDataUMAP"
    height="1000"
  ></Heatmap>
</template>
