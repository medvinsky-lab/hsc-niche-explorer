<script setup>
import DropDownItem from "./DropDownItem.vue";

const props = defineProps({
  title: {
    type: String,
    default: "title",
    required: true,
  },
  placeholder: {
    type: String,
    default: "Placeholder",
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["toggle", "selection"]);

function emitItem(title) {
  emit("toggle");
  emit("selection", title);
}
</script>

<template>
  <div>
    <p class="px-2 text-sm font-semibold text-slate-600 mb-1">{{ title }}</p>
    <div class="relative">
      <button
        @click="$emit('toggle')"
        class="p-2 bg-white w-[250px] rounded text-sm text-slate-400 text-left border-gray-100 border-2"
      >
        {{ placeholder }}
      </button>
      <div
        v-show="active"
        class="absolute bg-white w-[300px] rounded mt-1 border-gray-100 border-2"
      >
        <DropDownItem
          v-for="(item, index) in items"
          :key="index"
          :title="item"
          @click="emitItem(item)"
        ></DropDownItem>
      </div>
    </div>
  </div>
</template>
