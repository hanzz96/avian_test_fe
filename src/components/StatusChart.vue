<script setup>
import { ref } from 'vue'
import { useChart } from '../composables/useChart'

const props = defineProps({ data: { type: Array, required: true } })
const canvas = ref(null)

const COLORS = { RUNNING: '#3b82f6', FINISHED: '#10b981', OPEN: '#f59e0b', CANCELLED: '#94a3b8' }

useChart(canvas, () => ({
  type: 'doughnut',
  data: {
    labels: props.data.map((d) => d.status),
    datasets: [{ data: props.data.map((d) => d.total), backgroundColor: props.data.map((d) => COLORS[d.status] ?? '#6366f1') }],
  },
  options: { responsive: true, maintainAspectRatio: false, cutout: '60%', plugins: { legend: { position: 'bottom' } } },
}), () => props.data)
</script>

<template><canvas ref="canvas" /></template>
