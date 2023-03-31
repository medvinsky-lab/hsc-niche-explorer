<script setup>
import DropDownMenu from "./DropDownMenu.vue";
import Datasets from "../data/datasets.json";

import { ref, watch } from "vue";

const datasets = ref(Datasets);

const dropdowns = ref([
  {
    title: "Dataset",
    placeholder: "Select dataset",
    active: false,
    items: datasets.value.map((item) => item.name),
    selection: null,
  },
  {
    title: "Ligand region",
    placeholder: "Select ligand region",
    active: false,
    items: ["LCM-Seq CS13", "LCM-Seq CS14", "LCM-Seq CS16", "UMAP CS13-CS15"],
    selection: null,
  },
  {
    title: "Receptor region",
    placeholder: "Select receptor region",
    active: false,
    items: ["LCM-Seq CS13", "LCM-Seq CS14", "LCM-Seq CS16", "UMAP CS13-CS15"],
    selection: null,
  },
]);

const activeMenuIndex = ref(null);
function toggleMenu(index) {
  if (activeMenuIndex.value !== index) {
    activeMenuIndex.value = index;
  } else if (activeMenuIndex.value === index) {
    activeMenuIndex.value = null;
  }
}

watch(activeMenuIndex, async () => {
  for (let i = 0; i < dropdowns.value.length; i++) {
    if (activeMenuIndex.value === i) {
      dropdowns.value[i].active = true;
    } else {
      dropdowns.value[i].active = false;
    }
  }
});

function updateSelection() {}
</script>
<template>
  <div>
    <div class="px-2">
      <h3>Data explorer</h3>
    </div>
    <div class="px-2 py-4 bg-slate-50 rounded">
      <div class="flex flex-row justify-between">
        <div class="flex space-x-4 mb-2">
          <DropDownMenu
            v-for="(item, index) in dropdowns"
            :key="index"
            :title="item.title"
            :placeholder="item.placeholder"
            :active="item.active"
            :items="item.items"
            :selection="test"
            @toggle="toggleMenu(index)"
            @selection="updateSelection"
          ></DropDownMenu>
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
