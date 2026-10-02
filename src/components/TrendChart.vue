<script setup>
import { ref } from 'vue'
import { useChart } from '../composables/useChart'
import { formatDate } from '../utils'

const props = defineProps({ data: { type: Array, required: true } })
const canvas = ref(null)

useChart(canvas, () => ({
  type: 'line',
  data: {
    labels: props.data.map((d) => formatDate(d.date)),
    datasets: [
      { label: 'Good', data: props.data.map((d) => d.good_qty), borderColor: '#10b981', backgroundColor: '#10b98122', fill: true, tension: 0.3 },
      { label: 'Reject', data: props.data.map((d) => d.reject_qty), borderColor: '#ef4444', backgroundColor: '#ef444422', tension: 0.3 },
    ],
  },
  options: { responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false }, scales: { y: { beginAtZero: true } } },
}), () => props.data)
</script>

<template><canvas ref="canvas" /></template>
