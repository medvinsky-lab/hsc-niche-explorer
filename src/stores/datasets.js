import { defineStore } from "pinia";

export const useDatasetStore = defineStore("datasets", {
  state: () => ({
    activeDataset: "cs13",
  }),
});
