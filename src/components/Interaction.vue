<script setup>
import cytoscape from "cytoscape";
import d3Force from "cytoscape-d3-force";
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  activeData: {
    type: Array,
    required: true,
  },
});

cytoscape.use(d3Force);

const cy = ref();
function initPlot() {
  const chart = cytoscape({
    container: cy.value,
    minZoom: 0.2,
    maxZoom: 1.5,
    style: [
      {
        selector: ".show",
        style: {
          label: "data(score)",
          "text-background-opacity": 1,
          "text-background-shape": "round-rectangle",
          "text-background-color": "#f2f6fa",
          "text-background-padding": 5,
          "font-weight": 500,
        },
      },
      {
        selector: "edge",
        style: {
          width: "mapData(score, 0, 1, 0.2, 20)",
          "line-opacity": "mapData(score, 0, 1, 0.5, 1)",
          "target-arrow-shape": "triangle",
          "curve-style": "bezier",
        },
      },
      {
        selector: "node",
        style: {
          label: "data(id)",
          width: "mapData(dcn, 0, 1, 10, 50)",
          height: "mapData(dcn, 0, 1, 10, 50)",
        },
      },
    ],
  });
  // Add data
  props.activeData.forEach((d) => {
    chart.add([
      {
        group: "nodes",
        data: { id: d.ligand, type: "ligand" },
        style: {
          shape: "round-triangle",
        },
      },
      {
        group: "nodes",
        data: { id: d.receptor, type: "receptor" },
        style: {
          shape: "circle",
        },
      },
      {
        group: "edges",
        data: {
          id: d.ligand + d.receptor,
          source: d.ligand,
          target: d.receptor,
          score: Math.round(parseFloat(d.score) * 100) / 100,
        },
      },
    ]);
  });

  // Color top N interactions
  const n = 15;
  chart
    .edges()
    .sort((a, b) => {
      return b - a;
    })
    .slice(0, n)
    .style({
      "line-color": "red",
      "target-arrow-color": "red",
    });

  // Click to show label
  chart.on("click", "edge", (event) => {
    console.log("Triggered");
    event.target.toggleClass("show");
  });

  // Calculate node degrees and add as data
  const dcn = chart.elements().degreeCentralityNormalized();
  chart.nodes().forEach((n) => {
    n.data({
      dcn: dcn.degree(n),
    });
  });

  // Run layout
  chart
    .layout({
      name: "d3-force",
      fit: false,
      infinite: false,
      linkId: function id(d) {
        return d.id;
      },
      linkDistance: 40,
      manyBodyStrength: -300,
    })
    .run();
}
onMounted(initPlot);

watch(
  () => props.activeData,
  () => {
    initPlot();
  }
);
</script>
<template>
  <div ref="cy" class="w-full h-full"></div>
</template>
