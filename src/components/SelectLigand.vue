<script setup>
import { ref, inject, computed } from "vue";
import { useDatasetStore } from "../stores/datasets";

const store = useDatasetStore();
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["toggle", "itemHover", "itemExit"]);

const Datasets = inject("Datasets");
const activeDataset = computed(() =>
  Datasets.find((item) => {
    return item.id === store.activeDataset;
  })
);
const placeholder = computed(() => {
  if (store.activeLigand === null) {
    return "Select ligand region";
  } else {
    return activeDataset.value.interactors.find((item) => {
      return item.id === store.activeLigand;
    }).name;
  }
});
const options = computed(() =>
  activeDataset.value.interactors.map((item) => item.name)
);

const title = ref("Ligand region");

function toggle() {
  emit("toggle");
}
function updateActiveLigand(name) {
  const newActiveLigand = activeDataset.value.interactors.find((item) => {
    return item.name == name;
  });
  store.$patch({
    activeLigand: newActiveLigand.id,
  });
}
function emitHover(option) {
  emit("itemHover", option);
}
</script>
<template>
  <DropDownMenu
    :title="title"
    :placeholder="placeholder"
    :open="active"
    :options="options"
    @toggle="toggle"
    @select="updateActiveLigand"
    @item-hover="emitHover"
    @item-exit="$emit('itemExit')"
  ></DropDownMenu>
</template>
