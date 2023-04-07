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
  },
  open: {
    type: Boolean,
    default: false,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["toggle", "select", "itemHover", "itemExit"]);

function select(option) {
  emit("toggle");
  emit("select", option);
}
function hover(option) {
  emit("itemHover", option);
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
        v-show="open"
        class="absolute bg-white w-[300px] rounded mt-1 border-gray-100 border-2"
      >
        <DropDownItem
          v-for="(option, index) in options"
          :key="index"
          :title="option"
          @click="select(option)"
          @mouseover="hover(option)"
          @mouseout="$emit('itemExit')"
        ></DropDownItem>
      </div>
    </div>
  </div>
</template>
