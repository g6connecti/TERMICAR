import React, { useState } from 'react';
import { Cog, UploadCloud, CheckCircle, Send, MessageCircle, FileText } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

export function CustomEngineeringSection() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    partType: 'Terminal Articulado Especial',
    material: 'Aço SAE 1045',
    threadSpec: '',
    quantity: '100',
    notes: '',
  });

  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppCustom = () => {
    const text = encodeURIComponent(
      `*PROJETO SOB MEDIDA - TERMICAR*\n` +
      `*Cliente:* ${formData.name || 'Não informado'} (${formData.company || '-'})\n` +
      `*Telefone:* ${formData.phone || '-'}\n` +
      `*Tipo de Peça:* ${formData.partType}\n` +
      `*Material:* ${formData.material}\n` +
      `*Rosca/Dimensões:* ${formData.threadSpec || 'Conforme desenho/amostra'}\n` +
      `*Quantidade Desejada:* ${formData.quantity} peças\n` +
      `*Detalhes:* ${formData.notes || '-'}`
    );
    window.open(`https://wa.me/${COMPANY_INFO.contact.whatsappRaw}?text=${text}`, '_blank');
  };

  return (
    <section id="sob-medida" className="py-20 border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Information & Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-500">
              <Cog className="h-4 w-4 animate-spin text-red-500" style={{ animationDuration: '8s' }} />
              <span>Engenharia & Customização</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
              Fabricação Sob Medida, Amostra ou Desenho
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Não encontrou a medida exata no catálogo padrão? A Termicar desenvolve e usina
              componentes mecânicos especiais conforme sua necessidade técnica, tolerância dimensional
              e volume de fornecimento.
            </p>

            <div className="space-y-3 pt-2">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-1">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Desenvolvimento por Amostra Física
                </h4>
                <p className="text-xs text-slate-400">
                  Envie uma peça desgastada ou protótipo para nossa fábrica em São Paulo. Realizamos
                  a engenharia reversa e reproduzimos com material certificado.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-1">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Usinagem por Desenho 2D / 3D
                </h4>
                <p className="text-xs text-slate-400">
                  Aceitamos projetos em PDF, DWG, STEP ou croquis técnicos. Nossa equipe avalia
                  viabilidade e parâmetros de produção em até 24 horas úteis.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-1">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Tratamentos Térmicos e Superficiais
                </h4>
                <p className="text-xs text-slate-400">
                  Têmpera por indução, cementação, zincagem trivalente, oxidação negra, fosfatização
                  ou acabamento retificado.
                </p>
              </div>
            </div>

            {/* Visual Banner Peças sob Desenho */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl group">
              <div className="aspect-[16/9] overflow-hidden relative">
                <img
                  src="/images/metrology_bench_1790695297615.jpg"
                  alt="Peças sob Desenho e Usinagem Especial Termicar"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/inspection.jpg';
                  }}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    <span>Peças Sob Desenho Técnico & Amostra</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                    Desenho 2D / 3D
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Specification Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl">
              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <CheckCircle className="mx-auto h-16 w-16 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">Solicitação de Projeto Enviada!</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Nossa equipe técnica da Termicar analisará os parâmetros enviados e entrará em
                    contato com o orçamento de ferramental e peças seriadas.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleWhatsAppCustom}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Falar com Engenheiro no WhatsApp</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
                    >
                      Novo Projeto
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white">
                      Formulário de Engenharia & Projeto Especial
                    </h3>
                    <p className="text-xs text-slate-400">
                      Preencha os dados da peça para estimativa prévia de produção.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Seu Nome / Contato *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Roberto Ramos"
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Empresa / Cidade
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Ex: Transportes Brasil - Campinas/SP"
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(11) 99999-9999"
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        E-mail Corporativo *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="engenharia@empresa.com.br"
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Tipo de Componente
                      </label>
                      <select
                        value={formData.partType}
                        onChange={(e) => setFormData({ ...formData, partType: e.target.value })}
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
                      >
                        <option value="Terminal Articulado Especial">Terminal Articulado</option>
                        <option value="Pino Esférico Especial">Pino Esférico</option>
                        <option value="Esticador Mecânico">Esticador / Tirante</option>
                        <option value="Parafuso Oco / Niple">Parafuso Oco / Niple</option>
                        <option value="Outra Peça Usinada">Outra Peça Usinada</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Material Preferencial
                      </label>
                      <select
                        value={formData.material}
                        onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
                      >
                        <option value="Aço SAE 1045">Aço SAE 1045</option>
                        <option value="Aço SAE 8620 (Cementação)">Aço SAE 8620</option>
                        <option value="Aço Liga SAE 4140">Aço Liga SAE 4140</option>
                        <option value="Aço Inox (304/316)">Aço Inox</option>
                        <option value="Latão / Alumínio">Latão / Alumínio</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Quantidade Estimada
                      </label>
                      <input
                        type="text"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        placeholder="Ex: 50, 200, 1000 pçs"
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Medidas, Roscas e Aplicação Pretendida
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Ex: Rosca M12x1.5 esquerda, comprimento total 85mm, furo de esfera Ø16mm, para articulação de direção..."
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  {/* File Upload Zone */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Anexar Desenho Técnico ou Foto da Peça (PDF, PNG, JPG ou DWG)
                    </label>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 hover:border-red-500/50 rounded-xl p-4 cursor-pointer bg-slate-950/50 transition-colors">
                      <UploadCloud className="h-6 w-6 text-slate-400 mb-1" />
                      <span className="text-xs text-slate-300 font-medium">
                        {fileName ? fileName : 'Clique para selecionar o arquivo ou arraste até aqui'}
                      </span>
                      <span className="text-[10px] text-slate-500 mt-0.5">
                        Arquivos até 25MB (Desenho 2D, Croqui com medidas ou Foto)
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.png,.jpg,.jpeg,.dwg,.step,.stp"
                      />
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-red-950/40 hover:bg-red-500 transition-colors"
                    >
                      <Send className="h-4 w-4" />
                      <span>Solicitar Análise de Fabricação Termicar</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
