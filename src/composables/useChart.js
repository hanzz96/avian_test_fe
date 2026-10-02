import { onBeforeUnmount, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

/** Membuat Chart.js pada canvas ref, dan membangun ulang saat data berubah. */
export function useChart(canvasRef, buildConfig, source) {
  let chart = null

  const render = () => {
    chart?.destroy()
    if (canvasRef.value) chart = new Chart(canvasRef.value, buildConfig())
  }

  onMounted(render)
  watch(source, render, { deep: true })
  onBeforeUnmount(() => chart?.destroy())
}
