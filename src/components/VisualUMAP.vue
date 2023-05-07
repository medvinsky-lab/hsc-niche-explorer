<script setup>
import { ref, onMounted, computed, watchEffect } from "vue";
import { Chart } from "highcharts-vue";

import UmapDataHe from "../data/umap_he1.json";
import UmapDataNiche from "../data/umap_niche2.json";

const props = defineProps({
  input: {
    type: Array,
  },
  menuStates: {
    type: Object,
  },
});
const activeInput = computed(() => {
  // return [props.input[0], props.input[2]];
  return props.input;
});

const menusActive = computed(() => {
  return [props.menuStates.ligand, props.menuStates.receptor].some(
    (value) => value === true
  );
});

const symbol = "circle";
const radius = 2;

const chartOptionsHe = ref({
  credits: {
    enabled: false,
  },
  title: {
    text: "Hematoendothelial",
  },
  chart: {
    reflow: false,
    animation: false,
    type: "scatter",
    height: 500,
  },
  plotOptions: {
    series: {
      states: {
        inactive: {
          enabled: false,
        },
      },
      events: {
        legendItemClick: function (e) {
          e.preventDefault();
        },
      },
      marker: {
        symbol: symbol,
        radius: radius,
      },
    },
  },
  series: UmapDataHe,
});

const chartOptionsNiche = ref({
  credits: {
    enabled: false,
  },
  title: {
    text: "Mesenchymal/Endothelial",
  },
  chart: {
    reflow: false,
    animation: false,
    type: "scatter",
    height: 500,
  },
  plotOptions: {
    series: {
      states: {
        inactive: {
          enabled: false,
        },
      },
      events: {
        legendItemClick: function (e) {
          e.preventDefault();
        },
      },
      marker: {
        symbol: symbol,
        radius: radius,
      },
    },
  },
  series: UmapDataNiche,
});

const chartRefHe = ref(null);
const chartRefNiche = ref(null);

const seriesElements = ref([]);

function getChartSeriesIds(data, chart) {
  const ids = data.map((e) => e.id);
  const elements = chart.series.map(
    (series) => series.group.element.nextSibling
  );
  return ids.reduce((arr, id, index) => {
    arr.push({ id, element: elements[index] });
    return arr;
  }, []);
}

onMounted(() => {
  const umap1Elements = getChartSeriesIds(UmapDataHe, chartRefHe.value.chart);
  const umap2Elements = getChartSeriesIds(
    UmapDataNiche,
    chartRefNiche.value.chart
  );
  seriesElements.value = [...umap1Elements, ...umap2Elements];
});

watchEffect(() => {
  for (const seriesElement of seriesElements.value) {
    if (activeInput.value.includes(seriesElement.id)) {
      seriesElement.element.classList.remove("opacity-10");
    } else if (!activeInput.value.includes(seriesElement.id)) {
      const onlyNull = activeInput.value.every((value) => value == null);
      if (onlyNull) {
        seriesElement.element.classList.remove("opacity-10");
      } else if (!onlyNull) {
        seriesElement.element.classList.add("opacity-10");
      }
    }
  }
});
</script>
<template>
  <div class="h-[1000px] z-0">
    <div>
      <Chart :options="chartOptionsHe" ref="chartRefHe"></Chart>
    </div>
    <div>
      <Chart :options="chartOptionsNiche" ref="chartRefNiche"></Chart>
    </div>
  </div>
</template>
