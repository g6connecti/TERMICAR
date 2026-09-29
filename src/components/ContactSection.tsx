import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle, ExternalLink } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';
import { GoogleMapsLocation } from './GoogleMapsLocation';

export function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Dúvida sobre Produtos / Cotação',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent(
      `Olá, gostaria de falar com a equipe de vendas da Termicar Auto Peças.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.contact.whatsappRaw}?text=${text}`, '_blank');
  };

  return (
    <section id="contato" className="py-20 border-b border-slate-800 bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400 mb-2">
            <span>Atendimento Comercial & Fábrica</span>
            <span aria-hidden="true">·</span>
            <span>São Paulo / SP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
            Fale com a Termicar Auto Peças
          </h2>
          <p className="mt-2 text-base text-slate-300">
            Nossa equipe técnica e comercial está à disposição para esclarecer dúvidas dimensionais,
            consultar estoque e elaborar propostas comerciais para revendas e frotas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-6 shadow-xl">
              <div>
                <h3 className="text-lg font-bold text-white">Canais Oficiais</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Atendimento direto de fábrica desde 1969.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Telefone */}
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600/10 text-red-400 border border-red-900/30">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Telefone da Fábrica
                    </div>
                    <a
                      href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
                      className="text-base font-bold text-white hover:text-red-400 transition-colors font-mono"
                    >
                      {COMPANY_INFO.contact.phone}
                    </a>
                    <div className="text-xs text-slate-500">Linha direta com televendas</div>
                  </div>
                </div>

                {/* E-mail */}
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600/10 text-red-400 border border-red-900/30">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      E-mail Comercial
                    </div>
                    <a
                      href={`mailto:${COMPANY_INFO.contact.email}`}
                      className="text-sm font-semibold text-white hover:text-red-400 transition-colors font-mono"
                    >
                      {COMPANY_INFO.contact.email}
                    </a>
                    <div className="text-xs text-slate-500">Envio de pedidos e notas fiscais</div>
                  </div>
                </div>

                {/* Endereço */}
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600/10 text-red-400 border border-red-900/30">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Endereço da Fábrica
                    </div>
                    <p className="text-sm font-medium text-slate-200">
                      {COMPANY_INFO.address.street} - Bairro {COMPANY_INFO.address.neighborhood}
                    </p>
                    <p className="text-xs text-slate-400">
                      {COMPANY_INFO.address.city} - {COMPANY_INFO.address.state} · CEP {COMPANY_INFO.address.zip}
                    </p>
                    <a
                      href={COMPANY_INFO.address.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-semibold mt-1"
                    >
                      <span>Abrir no Google Maps</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {/* Horário */}
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600/10 text-red-400 border border-red-900/30">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Horário de Funcionamento
                    </div>
                    <p className="text-sm font-medium text-slate-200">
                      {COMPANY_INFO.contact.hours}
                    </p>
                    <div className="text-xs text-slate-500">Fuso horário de Brasília</div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={handleWhatsAppContact}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs sm:text-sm font-bold text-white hover:bg-emerald-500 shadow-lg shadow-emerald-950/40 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Conversar Agora pelo WhatsApp</span>
                </button>
              </div>
            </div>

            {/* CNPJ and Legal data */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-4 text-xs text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300">Dados Cadastrais da Empresa:</div>
              <div>Razão Social: {COMPANY_INFO.name}</div>
              <div className="font-mono">CNPJ: {COMPANY_INFO.cnpj}</div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 shadow-xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">Mensagem Enviada!</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Agradecemos seu contato. Nossa equipe responderá sua solicitação em breve.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'Dúvida sobre Produtos / Cotação',
                        message: '',
                      });
                    }}
                    className="rounded-xl bg-slate-800 px-5 py-2.5 text-xs font-semibold text-white hover:bg-slate-700"
                  >
                    Enviar Outra Mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-lg font-bold text-white">Envie uma Mensagem</h3>
                    <p className="text-xs text-slate-400">
                      Preencha o formulário abaixo para receber retorno direto de nossa equipe.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ex: Carlos Eduardo Silveira"
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="seuemail@empresa.com.br"
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Telefone / Celular *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="(11) 98765-4321"
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Assunto
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2.5 text-xs sm:text-sm text-white focus:border-red-500 focus:outline-none"
                    >
                      <option value="Cotação de Lote Seriados">Cotação de Lote Seriado</option>
                      <option value="Dúvida Técnica sobre Peça ou Rosca">Dúvida Técnica sobre Peça ou Rosca</option>
                      <option value="Parceria de Distribuição / Revenda">Parceria de Distribuição / Revenda</option>
                      <option value="Projeto de Peça Sob Medida">Projeto de Peça Sob Medida</option>
                      <option value="Outro Assunto">Outro Assunto</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Mensagem *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Descreva os códigos de peças, quantidades ou o que sua empresa necessita..."
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-red-950/40 hover:bg-red-500 transition-colors"
                  >
                    <Send className="h-4 w-4" />
                    <span>Enviar Mensagem para a Termicar</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Google Maps Component */}
        <GoogleMapsLocation />
      </div>
    </section>
  );
}
