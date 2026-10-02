<script setup>
defineProps({
  label: String,
  value: [String, Number],
  hint: String,
  accent: { type: String, default: 'bg-indigo-500' },
})
</script>

<template>
  <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div class="flex items-center gap-2 text-sm text-slate-500">
      <span class="h-2 w-2 rounded-full" :class="accent" />
      {{ label }}
    </div>
    <div class="mt-2 text-2xl font-semibold tabular-nums">{{ value }}</div>
    <div v-if="hint" class="mt-1 text-xs text-slate-400">{{ hint }}</div>
  </div>
</template>
