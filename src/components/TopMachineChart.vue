<script setup>
import { ref } from 'vue'
import { useChart } from '../composables/useChart'

const props = defineProps({ data: { type: Array, required: true } })
const canvas = ref(null)

useChart(canvas, () => ({
  type: 'bar',
  data: {
    labels: props.data.map((d) => d.machine_name),
    datasets: [{ label: 'Good Qty', data: props.data.map((d) => d.good_qty), backgroundColor: '#6366f1', borderRadius: 4 }],
  },
  options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true } } },
}), () => props.data)
</script>

<template><canvas ref="canvas" /></template>
