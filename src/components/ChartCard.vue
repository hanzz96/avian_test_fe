<script setup>
defineProps({ title: String })
</script>

<template>
  <section class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <h2 class="mb-3 text-sm font-semibold text-slate-700">{{ title }}</h2>
    <div class="relative h-64"><slot /></div>
  </section>
</template>
