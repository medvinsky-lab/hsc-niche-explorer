<script setup>
const props = defineProps({
  active: {
    type: Boolean,
  },
});
</script>
<template>
  <button
    class="p-2 bg-slate-900 text-slate-50 text-sm rounded w-[140px] font-semibold hover:bg-orange-200 hover:text-slate-900"
    :class="{ active: active }"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.active {
  background-color: #f7c59f;
  @apply text-slate-900;
}
</style>
