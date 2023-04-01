import { defineStore } from "pinia";

export const useDatasetStore = defineStore("datasets", {
  state: () => ({
    activeDataset: "cs13",
    activeLigand: null,
    activeReceptor: null,
    activePlotType: "heatmap",
  }),
});
