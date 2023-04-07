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
const emit = defineEmits(["toggle"]);

const Datasets = inject("Datasets");
const activeDataset = computed(() =>
  Datasets.find((item) => {
    return item.id === store.activeDataset;
  })
);
const placeholder = computed(() => {
  if (store.activeReceptor === null) {
    return "Select receptor region";
  } else {
    return activeDataset.value.interactors.find((item) => {
      return item.id === store.activeReceptor;
    }).name;
  }
});
const options = computed(() =>
  activeDataset.value.interactors.map((item) => item.name)
);

const title = ref("Receptor region");

function toggle() {
  emit("toggle");
}

function updateActiveReceptor(name) {
  const newActiveReceptor = activeDataset.value.interactors.find((item) => {
    return item.name == name;
  });
  store.$patch({
    activeReceptor: newActiveReceptor.id,
  });
}
function emitHover(option) {
  emit("hover", option);
}
</script>
<template>
  <DropDownMenu
    :title="title"
    :placeholder="placeholder"
    :open="active"
    :options="options"
    @toggle="toggle"
    @select="updateActiveReceptor"
    @hover="emitHover"
  ></DropDownMenu>
</template>
