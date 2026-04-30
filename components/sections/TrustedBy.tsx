import { trustedBy } from '@/lib/constants'

export default function TrustedBy() {
  const doubled = [...trustedBy, ...trustedBy]

  return (
    <section className="py-14 border-y border-white/[0.05] overflow-hidden">
      <div className="container-k0de px-4 mb-8">
        <p className="text-center text-slate-500 text-sm font-medium uppercase tracking-widest">
          Negócios que já têm seu site entregue pela k0de
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-950 to-transparent z-10 pointer-events-none" />

        {/* Marquee */}
        <div className="flex animate-scroll-left whitespace-nowrap">
          {doubled.map((company, i) => (
            <div key={i} className="flex items-center gap-12 mx-12 shrink-0">
              <div className="flex items-center gap-3 opacity-40 hover:opacity-80 transition-opacity cursor-default">
                <div className="w-2 h-2 rounded-full bg-brand-green/50" />
                <span className="font-display font-bold text-lg text-slate-300 whitespace-nowrap">
                  {company}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
