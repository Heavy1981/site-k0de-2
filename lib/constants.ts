import {
  Globe, Heart, Clock, CheckCircle, TrendingUp, Star,
  Building2, Phone, Users, Zap, Code, Monitor,
  Stethoscope, Scale, UtensilsCrossed, HardHat,
  Scissors, ShoppingBag, GraduationCap, Dumbbell,
  Home, Car,
  Bot, Mail, AtSign, Megaphone,
  MessageCircle, Send, Hash, FileSpreadsheet, Mic, Image, Video
} from 'lucide-react'

// Animation Variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
}

// Packages / Pricing
export const packages = [
  {
    name: 'Link',
    price: 'R$ 797',
    priceNote: 'pagamento único',
    popular: false,
    description: 'Sua presença digital completa em uma página: Instagram, WhatsApp, LinkedIn e tudo mais.',
    features: [
      'Mini site com bio + foto + links',
      'Integração Instagram e WhatsApp',
      'Links para LinkedIn e outras redes',
      'QR Code personalizado',
      'Design com sua identidade visual',
      'Entrega em 3 dias úteis',
    ],
    delivery: '3 dias úteis',
    cta: 'Começar agora',
    color: '#00ff88',
  },
  {
    name: 'Starter',
    price: 'R$ 1.489',
    priceNote: 'pagamento único',
    popular: false,
    description: 'Ideal para quem precisa de presença online rápida e profissional.',
    features: [
      'Landing page profissional',
      'Design responsivo mobile-first',
      'Botão WhatsApp integrado',
      'Formulário de contato',
      '1 rodada de revisão',
      'Entrega em 5 dias úteis',
    ],
    delivery: '5 dias úteis',
    cta: 'Começar agora',
    color: '#00ff88',
  },
  {
    name: 'Pro',
    price: 'R$ 2.959',
    priceNote: 'pagamento único',
    popular: true,
    description: 'Para negócios que querem um site completo, profissional e que aparece no Google.',
    features: [
      'Site com até 5 páginas',
      'Design responsivo mobile-first',
      'SEO básico configurado',
      'Google Analytics integrado',
      'Botão WhatsApp integrado',
      '2 rodadas de revisão',
      'Entrega em 7 dias úteis',
    ],
    delivery: '7 dias úteis',
    cta: 'Escolher Pro',
    color: '#00ff88',
  },
  {
    name: 'Scale',
    price: 'Sob consulta',
    priceNote: 'projeto personalizado',
    popular: false,
    description: 'Para empresas que precisam de solução completa, personalizada e com suporte contínuo.',
    features: [
      'Site personalizado completo',
      'Painel administrativo (CMS)',
      'Integrações customizadas',
      'Suporte mensal incluído',
      'Revisões ilimitadas',
      'Treinamento da equipe',
      'Entrega em até 15 dias úteis',
    ],
    delivery: '15 dias úteis',
    cta: 'Falar com especialista',
    color: '#00ff88',
  },
]

// Segments / Niches
export const segments = [
  { icon: '🏥', name: 'Saúde', description: 'Clínicas, consultórios e hospitais' },
  { icon: '⚖️', name: 'Jurídico', description: 'Advogados e escritórios' },
  { icon: '🍕', name: 'Restaurantes', description: 'Restaurantes e delivery' },
  { icon: '🏗️', name: 'Construção', description: 'Construtoras e reformas' },
  { icon: '💇', name: 'Beleza', description: 'Salões e clínicas estéticas' },
  { icon: '🛍️', name: 'Varejo', description: 'Lojas físicas e online' },
  { icon: '📚', name: 'Educação', description: 'Escolas e cursos' },
  { icon: '🏋️', name: 'Fitness', description: 'Academias e estúdios' },
  { icon: '🏠', name: 'Imóveis', description: 'Corretores e imobiliárias' },
  { icon: '🚗', name: 'Automotivo', description: 'Oficinas e concessionárias' },
]

// How it Works
export const steps = [
  {
    number: '01',
    title: 'Briefing',
    description: 'Você preenche um formulário rápido sobre seu negócio. Simples, sem reuniões longas.',
    icon: CheckCircle,
    emoji: '📋',
  },
  {
    number: '02',
    title: 'Design & Dev',
    description: 'Criamos seu site em até 7 dias úteis. Você aprova o layout antes de finalizar.',
    icon: Code,
    emoji: '⚡',
  },
  {
    number: '03',
    title: 'Entrega',
    description: 'Revisões, ajustes finais e seu site no ar em até 24h. Pronto para receber clientes.',
    icon: TrendingUp,
    emoji: '🚀',
  },
]

// Stats
export const stats = [
  { value: 50, suffix: '+', label: 'Sites Entregues', icon: Globe },
  { value: 100, suffix: '%', label: 'Satisfação dos Clientes', icon: Heart },
  { value: 7, suffix: ' dias', label: 'Prazo Médio de Entrega', icon: Clock },
  { value: 2, suffix: ' revisões', label: 'Inclusas em todos os planos', icon: CheckCircle },
]

// Testimonials
export const testimonials = [
  {
    name: 'Dr. João Silva',
    role: 'Dentista',
    company: 'Clínica Sorrir · Bragança Paulista',
    avatar: 'JS',
    avatarColor: '#3498DB',
    stars: 5,
    text: 'Meu site ficou incrível e em menos de 2 semanas já recebi 3 novos pacientes pelo Google. A k0de entregou tudo no prazo e com muita qualidade. Super recomendo!',
  },
  {
    name: 'Ana Ferreira',
    role: 'Proprietária',
    company: 'Studio Hair · Bragança Paulista',
    avatar: 'AF',
    avatarColor: '#E91E63',
    stars: 5,
    text: 'Precisava de uma landing page rápida para uma promoção. A k0de entregou em 5 dias, ficou lindo no celular e minhas clientes adoraram. Resultado imediato!',
  },
  {
    name: 'Ricardo Mendes',
    role: 'Advogado',
    company: 'Adv. Mendes & Associados · SP',
    avatar: 'RM',
    avatarColor: '#9B59B6',
    stars: 5,
    text: 'Site profissional, moderno e que transmite credibilidade. Recebi muitos elogios de clientes e colegas. Excelente trabalho da equipe k0de, entrega no prazo e com qualidade.',
  },
]

// Trusted companies
export const trustedBy = [
  'Clínica Boa Saúde', 'Studio Hair', 'Adv. Mendes',
  'Restaurante Sabor', 'Noctem', 'Fotostix',
  'Construtora Líder', 'Academia Fit', 'Escola Nova',
  'Imobiliária Prime', 'Auto Center SP', 'Clínica Estética Vue',
]

// FAQs
export const faqs = [
  {
    question: 'Qual o prazo de entrega?',
    answer: 'Starter: 5 dias úteis. Pro: 7 dias úteis. Scale: até 15 dias úteis. Tudo contado a partir da aprovação do briefing.',
  },
  {
    question: 'Quantas revisões estão inclusas?',
    answer: 'Starter: 1 rodada de revisão. Pro: 2 rodadas. Scale: revisões ilimitadas até sua total aprovação.',
  },
  {
    question: 'Preciso ter domínio e hospedagem?',
    answer: 'Não! Cuidamos de tudo. O domínio (.com.br) e a hospedagem no primeiro ano estão inclusos nos pacotes Pro e Scale.',
  },
  {
    question: 'Como funciona o pagamento?',
    answer: '50% na aprovação do briefing e 50% na entrega do site. Aceitamos Pix, cartão de crédito e boleto.',
  },
  {
    question: 'Vocês fazem manutenção depois?',
    answer: 'Sim! Temos planos de manutenção mensal a partir de R$ 299/mês. Atualizações de texto, imagens e pequenos ajustes inclusos.',
  },
  {
    question: 'Atendem todo o Brasil?',
    answer: 'Sim! Somos de Bragança Paulista/SP mas atendemos clientes em todo o Brasil de forma 100% remota, com a mesma qualidade e agilidade.',
  },
]

// Navigation links
export const navLinks = [
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Pacotes', href: '#pacotes' },
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'Depoimentos', href: '#depoimentos' },
]

// Services (channels + capabilities)
export const channels = [
  { icon: MessageCircle, name: 'WhatsApp Business', description: 'Chatbots, atendimento 24h e campanhas com IA.', color: '#25D366' },
  { icon: Send, name: 'Telegram', description: 'Bots, grupos, canais e Mini Apps personalizados.', color: '#2AABEE' },
  { icon: Hash, name: 'Slack', description: 'Automações, alertas e aprovações para equipes.', color: '#4A154B' },
  { icon: Mail, name: 'Gmail & Email', description: 'Auto-resposta, parsing e campanhas de email.', color: '#EA4335' },
]

export const capabilities = [
  { icon: FileSpreadsheet, name: 'Excel & Planilhas', description: 'Leitura, escrita e relatórios automáticos.', color: '#217346' },
  { icon: Mic, name: 'Voz com IA', description: 'Transcrição, agentes de voz e URA em PT-BR.', color: '#FF6B35' },
  { icon: Image, name: 'Processamento de Imagens', description: 'OCR, extração de notas fiscais e geração de imagens.', color: '#9B59B6' },
  { icon: Video, name: 'Vídeo & Mídia', description: 'Transcrição de vídeo, legendas automáticas e mídia.', color: '#E74C3C' },
]

// Automation Packages / Pricing
export const automationPackages = [
  {
    name: 'Starter',
    priceSetup: 'R$ 990',
    priceMonthly: 'R$ 197/mês',
    popular: false,
    description: 'Ideal para negócios que querem começar a automatizar o atendimento no WhatsApp.',
    features: [
      'Bot IA no WhatsApp 24h',
      'Respostas automáticas com IA',
      'Até 500 atendimentos/mês',
      'Histórico de conversas',
      'Suporte por 30 dias',
    ],
    cta: 'Começar agora',
    color: '#00ff88',
  },
  {
    name: 'Pro',
    priceSetup: 'R$ 1.990',
    priceMonthly: 'R$ 397/mês',
    popular: true,
    description: 'Para quem quer atender clientes no WhatsApp e converter leads por email no piloto automático.',
    features: [
      'Tudo do Starter',
      'Automação de email (sequência)',
      'Captação e nutrição de leads',
      'Até 2.000 atendimentos/mês',
      'Relatório mensal',
      'Suporte por 60 dias',
    ],
    cta: 'Escolher Pro',
    color: '#00ff88',
  },
  {
    name: 'Full',
    priceSetup: 'R$ 2.990',
    priceMonthly: 'R$ 597/mês',
    popular: false,
    description: 'Atendimento automatizado em todos os canais principais do seu negócio.',
    features: [
      'Tudo do Pro',
      'Instagram DM automático',
      'Até 5.000 atendimentos/mês',
      'Dashboard de métricas',
      'Suporte mensal incluso',
    ],
    cta: 'Escolher Full',
    color: '#00ff88',
  },
  {
    name: 'Scale',
    priceSetup: 'Sob consulta',
    priceMonthly: 'Sob consulta',
    popular: false,
    description: 'Solução completa e personalizada para empresas com alto volume e necessidades específicas.',
    features: [
      'Todos os canais',
      'Integrações customizadas',
      'Atendimentos ilimitados',
      'Suporte dedicado',
      'Treinamento da equipe',
    ],
    cta: 'Falar com especialista',
    color: '#00ff88',
  },
]

// Automations (informational cards — used in Services section)
export const automations = [
  {
    icon: Bot,
    name: 'WhatsApp Bot com IA',
    description: 'Atendimento automático 24h no WhatsApp. Bot inteligente que responde dúvidas, agenda e converte clientes enquanto você dorme.',
    color: '#25D366',
  },
  {
    icon: Mail,
    name: 'Email Marketing Automatizado',
    description: 'Sequências de email que captam, nutrem e convertem leads no piloto automático. Integração com sua plataforma de vendas.',
    color: '#4F8EF7',
  },
  {
    icon: AtSign,
    name: 'Instagram DM Automático',
    description: 'Responda DMs e comentários do Instagram automaticamente. Capture leads e direcione para WhatsApp sem esforço manual.',
    color: '#E1306C',
  },
  {
    icon: Megaphone,
    name: 'Campanhas de Marketing',
    description: 'Disparo de campanhas em massa por WhatsApp e email. Segmentação inteligente e relatórios em tempo real.',
    color: '#F5A623',
  },
]

// Contact
export const WHATSAPP_URL = 'https://wa.me/5511945920335?text=Olá%2C%20quero%20conhecer%20os%20pacotes%20da%20K0DE%21'
export const EMAIL = 'contato@k0de.com.br'
