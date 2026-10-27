// Калькулятор цены заявки и окупаемости рекламы. Чистая логика без React

export interface CalcInput {
  /** Рекламный бюджет в месяц, ₽ */
  budget: number
  /** Цена клика, ₽ */
  cpc: number
  /** Конверсия сайта в заявку, % */
  siteConv: number
  /** Конверсия заявки в сделку, % */
  dealConv: number
  /** Средний чек, ₽ */
  check: number
  /** Маржинальность, % */
  margin: number
}

export interface CalcResult {
  clicks: number
  leads: number
  deals: number
  /** Бюджет / заявки, ₽. null, если заявок нет */
  leadPrice: number | null
  /** Бюджет / сделки, ₽. null, если сделок нет */
  clientPrice: number | null
  revenue: number
  grossProfit: number
  /** ROMI, %: (валовая прибыль − бюджет) / бюджет × 100. null, если бюджет или цена клика не заданы */
  romi: number | null
}

export type Verdict = 'profit' | 'edge' | 'loss' | 'none'

export interface Hint {
  title: string
  text: string
}

export const DEFAULTS: CalcInput = {
  budget: 100000,
  cpc: 60,
  siteConv: 1.5,
  dealConv: 20,
  check: 150000,
  margin: 30,
}

// Пороги правил калькулятора. Это настройки расчёта, а не статистика рынка
const ROMI_PROFIT = 50 // ROMI от 50% — реклама окупается
const SITE_MIN = 1 // меньше 1% визитов дают заявку — слабый сайт
const DEAL_MIN = 10 // меньше 10% заявок доходят до сделки — слабые продажи
const MARGIN_MIN = 30 // маржа ниже 30% — слабое звено в экономике
const CPC_CUT = 0.1 // сценарий: цена клика ниже на 10%

/** Процент в долю, с ограничением 0–100% */
const share = (p: number) => Math.min(Math.max(p, 0), 100) / 100

export function calculate(i: CalcInput): CalcResult {
  const valid = i.budget > 0 && i.cpc > 0
  const clicks = valid ? i.budget / i.cpc : 0
  const leads = clicks * share(i.siteConv)
  const deals = leads * share(i.dealConv)
  const revenue = deals * i.check
  const grossProfit = revenue * share(i.margin)

  return {
    clicks,
    leads,
    deals,
    leadPrice: leads > 0 ? i.budget / leads : null,
    clientPrice: deals > 0 ? i.budget / deals : null,
    revenue,
    grossProfit,
    romi: valid ? ((grossProfit - i.budget) / i.budget) * 100 : null,
  }
}

/** Вердикт по ROMI: ниже 0 — не окупается, от 0 до 50% — на грани, от 50% — окупается */
export function verdictOf(romi: number | null): Verdict {
  if (romi === null) return 'none'
  if (romi < 0) return 'loss'
  if (romi < ROMI_PROFIT) return 'edge'
  return 'profit'
}

/**
 * Что улучшить первым. Правила идут по порядку, первое сработавшее побеждает:
 * 1. ROMI ниже 0 (клиент стоит дороже прибыли с него): мало сделок из заявок → продажи;
 *    мало заявок из визитов → сайт; иначе → реклама (цена клика).
 * 2. ROMI от 0 до 50%: маржа ниже 30% → маржа; мало сделок → продажи; иначе → реклама.
 * 3. ROMI от 50%: явных провалов нет, показываем следующий рычаг — цену клика.
 */
export function weakestLink(i: CalcInput, r: CalcResult): Hint | null {
  const verdict = verdictOf(r.romi)
  if (verdict === 'none') return null

  const dealLow = i.dealConv < DEAL_MIN
  const siteLow = i.siteConv < SITE_MIN
  const marginLow = i.margin < MARGIN_MIN

  // ROMI, если цену клика снизить на 10%. Бюджет и цена клика уже проверены выше
  const cpcCut = calculate({ ...i, cpc: i.cpc * (1 - CPC_CUT) }).romi ?? 0
  const cpcHint = `Снизьте цену клика на 10%: ROMI станет ${formatNum(Math.round(cpcCut))}%`

  if (verdict === 'loss') {
    if (dealLow) return { title: 'Отдел продаж', text: 'Меньше 10% заявок доходят до сделки. Проверьте, как обрабатывают заявки и где теряются клиенты' }
    if (siteLow) return { title: 'Сайт', text: 'Меньше 1% визитов оставляют заявку. Начните с первого экрана и формы заявки' }
    return { title: 'Реклама', text: cpcHint }
  }

  if (verdict === 'edge') {
    if (marginLow) return { title: 'Маржинальность', text: 'Маржа ниже 30%. Пересмотрите цены или расходы, которые съедают прибыль' }
    if (dealLow) return { title: 'Отдел продаж', text: 'Меньше 10% заявок доходят до сделки. Проверьте, как обрабатывают заявки и где теряются клиенты' }
    return { title: 'Реклама', text: cpcHint }
  }

  return { title: 'Явных провалов нет', text: `Следующий рычаг — цена клика. ${cpcHint}` }
}

/** Число с пробелами-разделителями тысяч (неразрывный пробел), дробная часть через запятую */
export function formatNum(n: number, digits = 0): string {
  const [int, frac] = n.toFixed(digits).split('.')
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return frac ? `${grouped},${frac}` : grouped
}
