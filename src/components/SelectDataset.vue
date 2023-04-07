<script setup>
import { ref, inject, computed } from "vue";
import { useDatasetStore } from "../stores/datasets";

const store = useDatasetStore();

const Datasets = inject("Datasets");
const activeDatasetName = computed(() => {
  return Datasets.find((item) => {
    return item.id === store.activeDataset;
  }).name;
});
const options = ref(Datasets.map((item) => ({ id: item.id, name: item.name })));

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["toggle"]);
function toggle() {
  emit("toggle");
}

function updateActiveDataset(option) {
  store.$patch({
    activeDataset: option.id,
    activeLigand: null,
    activeReceptor: null,
  });
}
</script>

<template>
  <DropDownMenu
    :title="'Dataset'"
    :placeholder="activeDatasetName"
    :open="active"
    :options="options"
    @toggle="toggle"
    @select="updateActiveDataset"
  ></DropDownMenu>
</template>
