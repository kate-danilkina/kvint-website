// Планировщик рекламного бюджета для B2B. Чистая логика без React

export interface PlannerInput {
  /** Продаж в месяц, шт */
  sales: number
  /** Конверсия заявки в продажу, % */
  conv: number
  /** Ожидаемая цена заявки, ₽ */
  leadPrice: number
}

export interface PlannerResult {
  /** Нужно заявок в месяц: продажи / конверсия. null, если продажи или конверсия не заданы */
  leads: number | null
  /** Бюджет в месяц: заявки × цена заявки. null, если цены заявки нет */
  budget: number | null
  /** Первый месяц теста: часть месячного бюджета, ₽ */
  testMonth: number | null
}

// Значения по умолчанию — пример, не рыночные данные
export const PLANNER_DEFAULTS: PlannerInput = {
  sales: 10,
  conv: 20,
  leadPrice: 2000,
}

/** Правило большого пальца: в первый месяц теста тратим половину месячного бюджета, а не весь */
export const TEST_MONTH_SHARE = 50

/** Процент в долю, с ограничением 0–100% */
const share = (p: number) => Math.min(Math.max(p, 0), 100) / 100

export function calculatePlan(i: PlannerInput): PlannerResult {
  const leads = i.sales > 0 && i.conv > 0 ? i.sales / share(i.conv) : null
  const budget = leads !== null && i.leadPrice > 0 ? leads * i.leadPrice : null

  return {
    leads,
    budget,
    testMonth: budget === null ? null : (budget * TEST_MONTH_SHARE) / 100,
  }
}
