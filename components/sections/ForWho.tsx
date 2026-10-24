import { audiences } from '@/lib/data/services'

export default function ForWho() {
  return (
    <section className="py-16 lg:py-20 bg-bg-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title mb-3">Кому подходит Квинт</h2>
        <p className="text-muted mb-10">Работаем там, где высока цена ошибки</p>

        <ul className="grid grid-cols-1 md:grid-cols-2 border-t border-white/10">
          {audiences.map((a, i) => (
            <li
              key={a.id}
              className={`py-6 border-b border-white/10 ${i % 2 === 1 ? 'md:pl-10 md:border-l' : 'md:pr-10'}`}
            >
              <h3 className="font-semibold text-text text-2xl tracking-tight mb-1">{a.title}</h3>
              <p className="text-muted">{a.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
