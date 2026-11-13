// Калькулятор окупаемости рекламы для B2B. Чистая логика без React

export interface PaybackInput {
  /** Средний чек, ₽ */
  check: number
  /** Маржинальность, % */
  margin: number
  /** Конверсия заявки в продажу, % */
  conv: number
  /** Цена заявки, ₽ */
  leadPrice: number
  /** Рекламный бюджет в месяц, ₽ */
  budget: number
  /** Длина сделки, мес. 0 — не задана */
  dealMonths: number
}

export interface PaybackResult {
  /** Заявок в месяц: бюджет / цена заявки. null, если бюджет или цена заявки не заданы */
  leads: number | null
  /** Продаж в месяц: заявки × конверсия */
  sales: number | null
  /** Цена клиента: бюджет / продажи. null, если продаж нет */
  clientPrice: number | null
  /** Валовая прибыль: продажи × чек × маржа */
  grossProfit: number | null
  /** ROMI, %: (валовая прибыль − бюджет) / бюджет × 100. null, если бюджета нет */
  romi: number | null
  /** Предельная цена заявки: чек × маржа × конверсия. null, если она равна нулю */
  maxLeadPrice: number | null
}

// Значения по умолчанию — пример, не рыночные данные
export const PAYBACK_DEFAULTS: PaybackInput = {
  check: 100000,
  margin: 30,
  conv: 20,
  leadPrice: 2000,
  budget: 200000,
  dealMonths: 3,
}

/** Процент в долю, с ограничением 0–100% */
const share = (p: number) => Math.min(Math.max(p, 0), 100) / 100

export function calculatePayback(i: PaybackInput): PaybackResult {
  const leads = i.budget > 0 && i.leadPrice > 0 ? i.budget / i.leadPrice : null
  const sales = leads === null ? null : leads * share(i.conv)
  const grossProfit = sales === null ? null : sales * i.check * share(i.margin)
  const maxLeadPrice = i.check * share(i.margin) * share(i.conv)

  return {
    leads,
    sales,
    clientPrice: sales !== null && sales > 0 ? i.budget / sales : null,
    grossProfit,
    romi: grossProfit === null ? null : ((grossProfit - i.budget) / i.budget) * 100,
    maxLeadPrice: maxLeadPrice > 0 ? maxLeadPrice : null,
  }
}
