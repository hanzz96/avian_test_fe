<script setup>
import { computed, onMounted, ref } from 'vue'
import { fetchDashboard } from './services/api'
import { formatNumber, formatPercent } from './utils'
import KpiCard from './components/KpiCard.vue'
import ChartCard from './components/ChartCard.vue'
import TrendChart from './components/TrendChart.vue'
import StatusChart from './components/StatusChart.vue'
import TopMachineChart from './components/TopMachineChart.vue'
import TopMachineTable from './components/TopMachineTable.vue'

const data = ref(null)
const loading = ref(false)
const error = ref('')
const updatedAt = ref(null)

async function load() {
  loading.value = true
  error.value = ''
  try {
    data.value = await fetchDashboard()
    updatedAt.value = new Date()
  } catch (e) {
    error.value = e.message || 'Gagal memuat data'
  } finally {
    loading.value = false
  }
}

const kpis = computed(() => {
  const s = data.value?.summary
  if (!s) return []
  return [
    { label: 'Total Machine', value: formatNumber(s.total_machine), accent: 'bg-slate-500' },
    { label: 'Running Work Order', value: formatNumber(s.running_order), accent: 'bg-blue-500' },
    { label: 'Finished Work Order', value: formatNumber(s.finished_order), accent: 'bg-emerald-500' },
    { label: 'Achievement', value: formatPercent(s.achievement), hint: `Target ${formatNumber(s.today_target)}`, accent: 'bg-indigo-500' },
    { label: 'Good Qty', value: formatNumber(s.today_good), accent: 'bg-green-500' },
    { label: 'Reject Qty', value: formatNumber(s.today_reject), accent: 'bg-red-500' },
  ]
})

onMounted(load)
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6">
    <header class="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-xl font-bold sm:text-2xl">Production Monitoring</h1>
        <p class="text-sm text-slate-500">PT XYZ Manufacturing<span v-if="updatedAt"> · diperbarui {{ updatedAt.toLocaleTimeString('id-ID') }}</span></p>
      </div>
      <button
        class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-50"
        :disabled="loading"
        @click="load"
      >{{ loading ? 'Memuat…' : 'Refresh' }}</button>
    </header>

    <div v-if="error" class="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {{ error }}
    </div>

    <div v-if="loading && !data" class="grid grid-cols-2 gap-4 lg:grid-cols-6">
      <div v-for="i in 6" :key="i" class="h-24 animate-pulse rounded-xl bg-slate-200" />
    </div>

    <template v-else-if="data">
      <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <KpiCard v-for="k in kpis" :key="k.label" v-bind="k" />
      </div>

      <div class="mt-6 grid gap-4 lg:grid-cols-3">
        <ChartCard title="Trend Produksi 7 Hari Terakhir" class="lg:col-span-2"><TrendChart :data="data.trend_7_days" /></ChartCard>
        <ChartCard title="Status Work Order"><StatusChart :data="data.status_breakdown" /></ChartCard>
      </div>

      <div class="mt-4 grid gap-4 lg:grid-cols-2">
        <ChartCard title="Top 10 Mesin berdasarkan Good Qty"><TopMachineChart :data="data.top_machines" /></ChartCard>
        <TopMachineTable :rows="data.top_machines" />
      </div>
    </template>
  </div>
</template>
