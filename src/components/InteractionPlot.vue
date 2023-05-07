<script setup>
import Interaction from "./Interaction.vue";
import InteractionDataCS13 from "../data/interactions/cs13_interactions.json";
import InteractionDataCS14 from "../data/interactions/cs14_interactions.json";
import InteractionDataCS16 from "../data/interactions/cs16_interactions.json";
import InteractionDataUMAP from "../data/interactions/umap_interactions.json";

import { storeToRefs } from "pinia";
import { useDatasetStore } from "../stores/datasets";
import { computed, ref, watch } from "vue";

const store = useDatasetStore();
const { activeDataset, activeLigand, activeReceptor, activePlotType } =
  storeToRefs(store);
const selected = ref(false);

const activeSelection = computed(() => {
  return [activeLigand.value, activeReceptor.value];
});

watch(
  activeSelection,
  () => {
    if (activeSelection.value.every((e) => e != null)) {
      selected.value = true;
    } else {
      selected.value = false;
    }
  },
  { immediate: true }
);

const activeData = computed(() => {
  if (selected.value) {
    if (activeDataset.value === "cs13") {
      return InteractionDataCS13[
        activeLigand.value + "_vs_" + activeReceptor.value
      ];
    }
    if (activeDataset.value === "cs14") {
      return InteractionDataCS14[
        activeLigand.value + "_vs_" + activeReceptor.value
      ];
    }
    if (activeDataset.value === "cs16") {
      return InteractionDataCS16[
        activeLigand.value + "_vs_" + activeReceptor.value
      ];
    }
    if (activeDataset.value === "umap") {
      return InteractionDataUMAP[
        activeLigand.value + "_vs_" + activeReceptor.value
      ];
    }
  }
});
</script>
<template>
  <div v-if="!selected" class="mx-auto flex place-items-center">
    <p>Please select ligand and receptor populations</p>
  </div>
  <Interaction v-else-if="selected" :active-data="activeData"></Interaction>
</template>
