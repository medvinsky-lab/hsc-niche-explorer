<script setup>
import { ref } from "vue";

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["toggle"]);
function toggle() {
  emit("toggle", "ligand");
}

const data = ref({
  title: "Ligand region",
  placeholder: "Select ligand region",
  options: ["LCM-Seq CS13", "LCM-Seq CS14", "LCM-Seq CS16", "UMAP CS13-CS15"],
});

const isOpen = ref(false);
</script>
<template>
  <DropDownMenu
    :title="data.title"
    :placeholder="data.placeholder"
    :open="active"
    :options="data.options"
    @toggle="toggle"
  ></DropDownMenu>
</template>
