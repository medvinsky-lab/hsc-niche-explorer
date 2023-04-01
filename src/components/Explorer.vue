<script setup>
import { ref, provide } from "vue";
import Button from "./Button.vue";
import SelectDataset from "./SelectDataset.vue";
import SelectLigand from "./SelectLigand.vue";
import SelectReceptor from "./SelectReceptor.vue";
import Datasets from "../data/datasets.json";
import { useDatasetStore } from "../stores/datasets";
import { computed } from "@vue/reactivity";

provide("Datasets", Datasets);
const store = useDatasetStore();

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

const activePlotType = computed(() => {
  return store.activePlotType;
});
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
          ></SelectLigand>
          <SelectReceptor
            :active="menuStates.receptor"
            @toggle="toggleMenus('receptor')"
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
        <div class="p-2 bg-white rounded"><p>hello</p></div>
        <div class="p-2 bg-white rounded"><p>hello</p></div>
      </div>
    </div>
  </div>
</template>
