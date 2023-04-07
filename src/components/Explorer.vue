<script setup>
import { ref, provide, computed } from "vue";
import { useDatasetStore } from "../stores/datasets";

import Button from "./Button.vue";
import SelectDataset from "./SelectDataset.vue";
import SelectLigand from "./SelectLigand.vue";
import SelectReceptor from "./SelectReceptor.vue";
import Datasets from "../data/datasets.json";
import VisualCS13 from "./VisualCS13.vue";
import VisualCS14 from "./VisualCS14.vue";
import VisualCS16 from "./VisualCS16.vue";
import VisualUMAP from "./VisualUMAP.vue";
import InteractionsPlot from "./InteractionsPlot.vue";
import HeatmapPlot from "./HeatmapPlot.vue";

provide("Datasets", Datasets);
const store = useDatasetStore();

const activeDataset = computed(() => {
  return store.activeDataset;
});
const activePlotType = computed(() => {
  return store.activePlotType;
});

const hoveredLigand = ref(null);
const hoveredReceptor = ref(null);
const menuStates = ref({
  dataset: false,
  ligand: false,
  receptor: false,
});

function toggleMenus(key) {
  for (const k in menuStates.value) {
    if (k === key) {
      menuStates.value[key] = !menuStates.value[key];
    } else {
      menuStates.value[k] = false;
    }
  }
}
function updatePlotType(newPlotType) {
  store.$patch({
    activePlotType: newPlotType,
  });
}
</script>
<template>
  <div>
    <div class="px-2">
      <h3>Data explorer</h3>
    </div>
    <div class="px-2 py-4 bg-slate-50 rounded">
      <div class="flex flex-row justify-between">
        <div class="flex space-x-4 mb-2">
          <SelectDataset
            :active="menuStates.dataset"
            @toggle="toggleMenus('dataset')"
          ></SelectDataset>
          <SelectLigand
            :active="menuStates.ligand"
            @toggle="toggleMenus('ligand')"
            @item-hover="(option) => (hoveredLigand = option)"
            @item-exit="hoveredLigand = null"
          ></SelectLigand>
          <SelectReceptor
            :active="menuStates.receptor"
            @toggle="toggleMenus('receptor')"
            @item-hover="(option) => (hoveredReceptor = option)"
            @item-exit="hoveredReceptor = null"
          ></SelectReceptor>
        </div>
        <div class="flex space-x-4 items-end mb-2">
          <Button
            @click="updatePlotType('heatmap')"
            :active="activePlotType === 'heatmap'"
            >Heatmap</Button
          >
          <Button
            @click="updatePlotType('interactions')"
            :active="activePlotType === 'interactions'"
            >Interactions</Button
          >
        </div>
      </div>
      <div class="grid grid-rows-1 grid-cols-2 gap-4">
        <div class="p-12 bg-white rounded">
          <VisualCS13 v-if="activeDataset === 'cs13'"></VisualCS13>
          <VisualCS14 v-if="activeDataset === 'cs14'"></VisualCS14>
          <VisualCS16 v-if="activeDataset === 'cs16'"></VisualCS16>
          <VisualUMAP v-if="activeDataset === 'umap'"></VisualUMAP>
        </div>
        <div class="p-2 bg-white rounded">
          <HeatmapPlot v-if="activePlotType === 'heatmap'"></HeatmapPlot>
          <InteractionsPlot
            v-if="activePlotType === 'interactions'"
          ></InteractionsPlot>
        </div>
      </div>
    </div>
  </div>
</template>
