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
const title = ref("Dataset");
const options = ref(Datasets.map((item) => item.name));

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

function updateActiveDataset(name) {
  const newActiveDataset = Datasets.find((item) => {
    return item.name == name;
  });
  store.$patch({
    activeDataset: newActiveDataset.id,
    activeLigand: null,
    activeReceptor: null,
  });
}
</script>
<template>
  <DropDownMenu
    :title="title"
    :placeholder="activeDatasetName"
    :open="active"
    :options="options"
    @toggle="toggle"
    @select="updateActiveDataset"
  ></DropDownMenu>
</template>
