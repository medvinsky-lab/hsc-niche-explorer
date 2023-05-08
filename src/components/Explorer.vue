<script setup>
import { ref, provide, computed, watch } from "vue";
import { useDatasetStore } from "../stores/datasets";
import { storeToRefs } from "pinia";

import Button from "./Button.vue";
import SelectDataset from "./SelectDataset.vue";
import SelectLigand from "./SelectLigand.vue";
import SelectReceptor from "./SelectReceptor.vue";
import Datasets from "../data/datasets.json";
import VisualCS13 from "./VisualCS13.vue";
import VisualCS14 from "./VisualCS14.vue";
import VisualCS16 from "./VisualCS16.vue";
import VisualUMAP from "./VisualUMAP.vue";
import InteractionPlot from "./InteractionPlot.vue";
import HeatmapPlot from "./HeatmapPlot.vue";

provide("Datasets", Datasets);
const store = useDatasetStore();

const { activeDataset, activeLigand, activeReceptor, activePlotType } =
  storeToRefs(store);
const hoveredLigand = ref(null);
const hoveredReceptor = ref(null);
const input = computed(() => [
  activeLigand.value,
  hoveredLigand.value?.id,
  activeReceptor.value,
  hoveredReceptor.value?.id,
]);

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
        <div class="flex space-x-4 mb-2 z-10">
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
          <VisualCS13
            v-if="activeDataset === 'cs13'"
            :input="input"
          ></VisualCS13>
          <VisualCS14
            v-if="activeDataset === 'cs14'"
            :input="input"
          ></VisualCS14>
          <VisualCS16
            v-if="activeDataset === 'cs16'"
            :input="input"
          ></VisualCS16>
          <VisualUMAP
            v-if="activeDataset === 'umap'"
            :input="input"
            :menu-states="menuStates"
          ></VisualUMAP>
        </div>

        <div class="flex place-items-center bg-white rounded">
          <KeepAlive>
            <HeatmapPlot v-if="activePlotType === 'heatmap'"></HeatmapPlot>
          </KeepAlive>
          <InteractionPlot
            v-if="activePlotType === 'interactions'"
          ></InteractionPlot>
        </div>
      </div>
      <div class="grid grid-rows-1 grid-cols-2 gap-4 py-2">
        <div v-if="activeDataset !== 'umap'" class="flex flex-col">
          <div class="px-2">
            <h3 class="text-sm font-semibold text-slate-600">Explanation</h3>
          </div>
          <div class="p-2 bg-white rounded flex-grow">
            <p>
              Spatial transcriptome schematics show transverse sections of the
              human embryo including the neural tube, dorsal aorta and
              urogenital ridges. Sub-dissected domains around the dorsal aorta,
              where hematopoietic stem cells first emerge from the ventral
              vessel wall, are highlighted.
            </p>
          </div>
        </div>
        <div v-else-if="activeDataset === 'umap'" class="flex flex-col">
          <div class="px-2">
            <h3 class="text-sm font-semibold text-slate-600">Explanation</h3>
          </div>
          <div class="p-2 bg-white rounded flex-grow">
            <p>
              The UMAP dataset shows hematopoietic stem/progenitor cells and
              niche populations within the dorsal aorta and sub-aortic
              mesenchyme of human embryos CS13-15.
            </p>
          </div>
        </div>
        <div v-if="activePlotType === 'heatmap'" class="flex flex-col">
          <div class="px-2">
            <h3 class="text-sm font-semibold text-slate-600">Explanation</h3>
          </div>
          <div class="p-2 bg-white rounded flex-grow">
            <p>
              Heatmap shows the summed-specificity weights between each
              domain/cell type ligand-receptor pair. Pairs connected by many
              specific edges will have higher summed-specificity weights i.e.
              greater predicted signaling interactions.
            </p>
          </div>
        </div>
        <div
          v-else-if="activePlotType === 'interactions'"
          class="flex flex-col"
        >
          <div class="px-2">
            <h3 class="text-sm font-semibold text-slate-600">Explanation</h3>
          </div>
          <div class="p-2 bg-white rounded flex-grow">
            <p>
              The Interactions tab show NATMI predicted ligand-receptor
              interactions for the selected domains as a network. The top 15
              specificity weights are highlighted by red arrows. Node size is
              proportional to the number of interactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
