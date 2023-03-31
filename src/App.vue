<script setup>
import Introduction from "./components/Introduction.vue";
import Tutorial from "./components/Tutorial.vue";
import Explorer from "./components/Explorer.vue";
</script>

<template>
  <div class="grid grid-rows-1 grid-cols-2 gap-4">
    <div class="p-2 mb-8">
      <h1>
        Receptor-ligand interactions across the human embryonic hematopoietic
        stem cell niche
      </h1>
    </div>
  </div>
  <div class="grid grid-rows-1 grid-cols-2 gap-4 mb-8">
    <Introduction></Introduction>
    <Tutorial></Tutorial>
  </div>
  <div class="grid grid-rows-1, grid-cols-1, gap-4 mb-8">
    <Explorer></Explorer>
  </div>
  <div class="grid grid-rows-1 grid-cols-1 gap-4">
    <div class="p-2 bg-slate-50">
      <p class="text-sm text-center">Developed by Omiqa Bioinformatics</p>
    </div>
  </div>
</template>

<style scoped></style>
