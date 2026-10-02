const nf = new Intl.NumberFormat('id-ID')

export const formatNumber = (n) => nf.format(n ?? 0)
export const formatPercent = (n) => `${(n ?? 0).toFixed(2)}%`
export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })
