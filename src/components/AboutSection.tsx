import { Award, ShieldCheck, CheckCircle2, Cpu, Wrench, Clock } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

export function AboutSection() {
  const milestones = [
    {
      year: '1969',
      title: 'Fundação da Termicar',
      description: 'Início das atividades no bairro de Santa Clara, em São Paulo, com foco em usinagem mecânica de precisão.',
    },
    {
      year: '1984',
      title: 'Pioneirismo em Terminais DIN 71802',
      description: 'Nacionalização de terminais articulados e pinos esféricos para atender a expansão da frota pesada.',
    },
    {
      year: '1998',
      title: 'Consolidação na Linha Pesada',
      description: 'Lançamento das referências T 101, T 153 e esticadores para motores Mercedes-Benz e Scania.',
    },
    {
      year: '2015',
      title: 'Modernização CNC e Metrologia',
      description: 'Incorporação de centros de usinagem computadorizados e laboratório dimensional micrométrico.',
    },
    {
      year: 'Hoje',
      title: 'Mais de 55 Anos de Tradição',
      description: 'Fornecimento contínuo para distribuidores, frotas de transporte e indústrias em todos os estados do Brasil.',
    },
  ];

  return (
    <section id="empresa" className="py-20 border-b border-slate-800 bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400">
              <span>Tradição Industrial Brasileira</span>
              <span aria-hidden="true">·</span>
              <span>Fundada em 1969</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display [text-wrap:balance]">
              Mais de 5 décadas dedicadas à confiabilidade mecânica
            </h2>

            <p className="text-base text-slate-300 leading-relaxed font-normal">
              A <strong>Termicar Indústria e Comércio de Auto Peças Ltda.</strong> nasceu em São Paulo
              com o compromisso de entregar componentes com exatidão micrométrica e resistência extrema
              ao desgaste.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              Diferente de importadores genéricos, fabricamos nossas próprias peças em solo nacional.
              Isso garante rastreabilidade total da matéria-prima (aços certificados SAE 1045 e 8620),
              tratamento térmico controlado, têmpera localizada e zincagem trivalente contra corrosão severa.
            </p>

            {/* Quality checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Tornos CNC de Alta Velocidade</h4>
                  <p className="text-xs text-slate-400">Repetibilidade rigorosa em grandes lotes seriados.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Controle Dimensional Rígido</h4>
                  <p className="text-xs text-slate-400">Calibradores passa/não-passa e micrômetros aferidos.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Proteção Trivalente Anticorrosiva</h4>
                  <p className="text-xs text-slate-400">Resistência ampliada ao salitre, poeira e intempéries.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Pronta Entrega para o Brasil</h4>
                  <p className="text-xs text-slate-400">Estoque estratégico em São Paulo e despacho ágil.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Showcase with Image */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-2 shadow-2xl">
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-slate-900 relative">
                <img
                  src="/images/inspection.jpg"
                  alt="Inspeção de qualidade e metrologia na Termicar Auto Peças"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/factory_quality_inspection_1790651271880.jpg';
                  }}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Laboratório de Metrologia e Qualidade</div>
                      <div className="text-[11px] text-slate-400">Rua Princesa Maria Pia, 100 - São Paulo/SP</div>
                    </div>
                    <span className="font-mono text-xs font-bold text-red-400 bg-red-950/60 border border-red-800 px-2 py-1 rounded">
                      Desde 1969
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline / Milestones */}
        <div className="mt-20 pt-12 border-t border-slate-800">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-red-500">Nossa Trajetória</span>
            <h3 className="text-2xl font-bold text-white mt-1">Mais de Meio Século Construindo a História da Reposição</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative space-y-2 border-l-2 border-slate-800 pl-4 md:border-l-0 md:border-t-2 md:pl-0 md:pt-4">
                <span className="font-mono text-sm font-black text-red-400 tabular-nums">
                  {m.year}
                </span>
                <h4 className="text-sm font-bold text-white">{m.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
