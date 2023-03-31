<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "title",
  },
});
</script>

<template>
  <div class="flex">
    <button
      class="p-2 text-sm text-left hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded flex-grow"
    >
      {{ title }}
    </button>
  </div>
</template>
