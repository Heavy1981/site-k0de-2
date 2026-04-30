import { MessageCircle, Mail, Instagram, Linkedin, Send } from 'lucide-react'
import { WHATSAPP_URL, EMAIL } from '@/lib/constants'

const footerLinks = {
  Serviços: ['Landing Pages', 'Sites Institucionais', 'E-commerce', 'SEO', 'Manutenção', 'Consultoria'],
  Empresa: ['Sobre a køde', 'Portfólio', 'Blog', 'Carreiras', 'Contato'],
  Legal: ['Política de Privacidade', 'Termos de Uso', 'LGPD', 'Política de Cookies'],
}

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-white/[0.06]">
      <div className="container-k0de section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1a1f2e] to-[#0d1117] border border-white/10 flex items-center justify-center shadow-lg flex-shrink-0">
                <svg width="17" height="17" viewBox="0 0 22 22" fill="none">
                  <path d="M5 4v14M5 11l5-4M5 11l6 7" stroke="#e2e8f0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="15" cy="11" r="3.5" stroke="#4B7BFF" strokeWidth="1.7"/>
                  <line x1="12.5" y1="8.5" x2="17.5" y2="13.5" stroke="#4B7BFF" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex flex-col gap-0">
                <span className="font-display font-bold text-[1.25rem] leading-none tracking-[-0.5px] text-white">
                  k<span className="text-[#4B7BFF]">ø</span>de
                </span>
                <span className="font-mono text-[0.48rem] tracking-[0.18em] text-slate-600 uppercase leading-none mt-0.5">
                  Sites & Landing Pages
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              Sites e landing pages profissionais para negócios de Bragança Paulista e do Brasil todo. Entrega em 7 dias.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-brand-green hover:border-brand-green/30 transition-all">
                <MessageCircle size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-brand-green hover:border-brand-green/30 transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-brand-green hover:border-brand-green/30 transition-all">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-brand-green hover:border-brand-green/30 transition-all">
                <Send size={16} />
              </a>
              <a href={`mailto:${EMAIL}`} className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-brand-green hover:border-brand-green/30 transition-all">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-white mb-4 text-sm">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-brand-green text-sm transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} køde Sites & Landing Pages. Todos os direitos reservados.
          </p>
          <p className="text-slate-600 text-xs">
            Bragança Paulista, SP · Brasil
          </p>
        </div>
      </div>
    </footer>
  )
}
