<script setup>
import { formatNumber, formatPercent } from '../utils'

defineProps({ rows: { type: Array, required: true } })
</script>

<template>
  <section class="rounded-xl border border-slate-200 bg-white shadow-sm">
    <h2 class="px-4 pt-4 text-sm font-semibold text-slate-700">Top 10 Machine Performance</h2>
    <div class="mt-3 overflow-x-auto">
      <table class="w-full min-w-[480px] text-left text-sm">
        <thead class="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th class="px-4 py-2">#</th>
            <th class="px-4 py-2">Machine</th>
            <th class="px-4 py-2 text-right">Good Qty</th>
            <th class="px-4 py-2 text-right">Achievement</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="(m, i) in rows" :key="m.machine_code" class="hover:bg-slate-50">
            <td class="px-4 py-2 text-slate-400">{{ i + 1 }}</td>
            <td class="px-4 py-2">
              <div class="font-medium">{{ m.machine_name }}</div>
              <div class="text-xs text-slate-400">{{ m.machine_code }}</div>
            </td>
            <td class="px-4 py-2 text-right tabular-nums">{{ formatNumber(m.good_qty) }}</td>
            <td class="px-4 py-2 text-right tabular-nums">
              <span
                class="rounded-full px-2 py-0.5 text-xs font-medium"
                :class="m.achievement >= 90 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'"
              >{{ formatPercent(m.achievement) }}</span>
            </td>
          </tr>
          <tr v-if="!rows.length"><td colspan="4" class="px-4 py-6 text-center text-slate-400">Belum ada data</td></tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
