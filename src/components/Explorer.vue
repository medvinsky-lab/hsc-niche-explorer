<script setup>
import { ref, provide } from "vue";
import SelectDataset from "./SelectDataset.vue";
import SelectLigand from "./SelectLigand.vue";
import SelectReceptor from "./SelectReceptor.vue";
import Datasets from "../data/datasets.json";

provide("Datasets", Datasets);

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
            @toggle="toggleMenus"
          ></SelectDataset>
          <SelectLigand
            :active="menuStates.ligand"
            @toggle="toggleMenus"
          ></SelectLigand>
          <SelectReceptor
            :active="menuStates.receptor"
            @toggle="toggleMenus"
          ></SelectReceptor>
        </div>
        <div class="flex space-x-4 items-end">
          <p>Heatmap</p>
          <p>Interactions</p>
        </div>
      </div>
      <div class="grid grid-rows-1 grid-cols-2 gap-4">
        <div class="p-2 bg-white rounded"><p>hello</p></div>
        <div class="p-2 bg-white rounded"><p>hello</p></div>
      </div>
    </div>
  </div>
</template>
