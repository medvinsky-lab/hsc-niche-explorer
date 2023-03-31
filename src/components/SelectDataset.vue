<script setup>
import { ref, inject, computed } from "vue";
import { useDatasetStore } from "../stores/datasets";

const store = useDatasetStore();

const Datasets = inject("Datasets");
const activeDataset = computed(() => {
  return Datasets.find((item) => {
    return item.id === store.activeDataset;
  }).name;
});

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["toggle"]);
function toggle() {
  emit("toggle", "dataset");
}

const data = ref({
  title: "Dataset",
  placeholder: "Select dataset",
  options: Datasets.map((item) => item.name),
});

function updateActiveDataset(name) {
  const newActiveDataset = Datasets.find((item) => {
    return item.name == name;
  });
  store.$patch({
    activeDataset: newActiveDataset.id,
  });
}
</script>
<template>
  <DropDownMenu
    :title="data.title"
    :placeholder="activeDataset"
    :open="active"
    :options="data.options"
    @toggle="toggle"
    @select="updateActiveDataset"
  ></DropDownMenu>
</template>
