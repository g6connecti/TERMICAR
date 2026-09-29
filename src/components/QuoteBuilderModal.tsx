import React, { useState } from 'react';
import { X, Trash2, Send, MessageCircle, FileText, CheckCircle2, Plus, ArrowRight } from 'lucide-react';
import { Product, COMPANY_INFO } from '../data/products';

export interface QuoteItem {
  product: Product;
  quantity: number;
}

interface QuoteBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearQuote: () => void;
  onBrowseCatalog: () => void;
}

export function QuoteBuilderModal({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearQuote,
  onBrowseCatalog,
}: QuoteBuilderModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    cnpj: '',
    email: '',
    phone: '',
    cityState: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const totalPieces = items.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateWhatsAppMessage = () => {
    const header = `*SOLICITAÇÃO DE COTAÇÃO - TERMICAR AUTO PEÇAS*\n`;
    const client = `*Cliente:* ${formData.name || 'Não informado'}\n*Empresa:* ${formData.company || 'Consumidor/Frotista'}\n*CNPJ/CPF:* ${formData.cnpj || 'Sob consulta'}\n*Telefone:* ${formData.phone || 'Informado na conversa'}\n*Localidade:* ${formData.cityState || 'Brasil'}\n\n`;
    
    const itemsList = items.map((it, idx) => {
      return `${idx + 1}. *[${it.product.code}]* ${it.product.name}\n   - Qtd: ${it.quantity} peças\n   - Aplicação: ${it.product.application.join(', ')}`;
    }).join('\n\n');

    const notes = formData.notes ? `\n\n*Observações:* ${formData.notes}` : '';
    const footer = `\n\n_Enviado através do novo portal Termicar (termicar.com.br)_`;

    return encodeURIComponent(header + client + itemsList + notes + footer);
  };

  const handleSendWhatsApp = () => {
    const text = generateWhatsAppMessage();
    // Using official Termicar WhatsApp or direct phone
    const url = `https://wa.me/${COMPANY_INFO.contact.whatsappRaw}?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadSummary = () => {
    const content = `TERMICAR INDÚSTRIA E COMÉRCIO DE AUTO PEÇAS LTDA.
Rua Princesa Maria Pia, 100 - Bairro Santa Clara - São Paulo/SP
Tel: (11) 2301-0277 | E-mail: termicar@termicar.com.br
CNPJ: 62.725.114/0001-56
------------------------------------------------------------
RESUMO DE SOLICITAÇÃO DE ORÇAMENTO
Data: ${new Date().toLocaleDateString('pt-BR')}

DADOS DO SOLICITANTE:
Responsável: ${formData.name || '-'}
Empresa: ${formData.company || '-'}
CNPJ/CPF: ${formData.cnpj || '-'}
E-mail: ${formData.email || '-'}
Telefone/WhatsApp: ${formData.phone || '-'}
Cidade/UF: ${formData.cityState || '-'}

ITENS SELECIONADOS:
${items.map((it, i) => `${i + 1}. Cód: ${it.product.code} - ${it.product.name}
   Quantidade: ${it.quantity} peças
   Rosca: ${it.product.thread} | Material: ${it.product.material}
   OEM Ref: ${it.product.oemReference || 'N/A'}`).join('\n\n')}

TOTAL DE ITENS: ${items.length} tipo(s) | TOTAL DE PEÇAS: ${totalPieces}

OBSERVAÇÕES DO CLIENTE:
${formData.notes || 'Nenhuma observação informada.'}
------------------------------------------------------------
Termicar - Tradição e Confiança em Autopeças Desde 1969.`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Orcamento-Termicar-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 text-slate-100 shadow-2xl z-10 my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600/20 text-red-400 border border-red-500/30">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Cotação de Autopeças Termicar
              </h2>
              <p className="text-xs text-slate-400">
                {items.length === 0
                  ? 'Nenhum item selecionado'
                  : `${items.length} produto(s) · ${totalPieces} peças no total`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {submitted ? (
            <div className="py-12 text-center space-y-4 max-w-md mx-auto">
              <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-400" />
              <h3 className="text-2xl font-bold text-white">Solicitação Recebida com Sucesso!</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Nossa equipe comercial da Termicar analisará as especificações e retornará o orçamento com
                prazos e melhores condições para o e-mail <strong>{formData.email || 'informado'}</strong>.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleSendWhatsApp}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-500 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Agilizar pelo WhatsApp</span>
                </button>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClearQuote();
                    onClose();
                  }}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
                >
                  Fechar Janela
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-slate-400">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Seu orçamento está vazio</h3>
              <p className="text-sm text-slate-400 max-w-sm mx-auto">
                Navegue pelo catálogo de terminais, pinos e esticadores da Termicar e adicione os itens desejados.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBrowseCatalog();
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-500 transition-colors"
              >
                <span>Explorar Catálogo Agora</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Items List */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                    Peças Selecionadas
                  </h3>
                  <button
                    onClick={onClearQuote}
                    className="text-xs text-slate-400 hover:text-red-400 transition-colors"
                  >
                    Limpar Lista
                  </button>
                </div>

                <div className="space-y-3">
                  {items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3.5"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-red-400">
                            {product.code}
                          </span>
                          <span className="text-xs text-slate-400 truncate">
                            {product.norm}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-white truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs text-slate-400">
                          Rosca: {product.thread}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-lg border border-slate-700 bg-slate-900 p-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, Math.max(1, quantity - 1))}
                            className="h-7 w-7 rounded text-xs font-bold text-slate-300 hover:bg-slate-800"
                          >
                            -
                          </button>
                          <span className="w-10 text-center font-mono text-xs font-bold text-white tabular-nums">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                            className="h-7 w-7 rounded text-xs font-bold text-slate-300 hover:bg-slate-800"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(product.id)}
                          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-800 hover:text-red-400 transition-colors"
                          title="Remover item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct quick action buttons */}
                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    onClick={handleDownloadSummary}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 transition-colors"
                  >
                    <FileText className="h-3.5 w-3.5 text-slate-400" />
                    <span>Baixar Resumo em Arquivo</span>
                  </button>
                  <button
                    onClick={handleSendWhatsApp}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-700/60 bg-emerald-950/40 px-3 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-900/50 transition-colors"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Enviar direto pelo WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Form Column */}
              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  Dados para Faturamento & Envio
                </h3>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Nome do Responsável *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Carlos Silva (Compras)"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Empresa / Razão Social
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Nome da empresa ou oficina"
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        CNPJ ou CPF
                      </label>
                      <input
                        type="text"
                        value={formData.cnpj}
                        onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                        placeholder="00.000.000/0001-00"
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        E-mail de Contato *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="compras@suaempresa.com.br"
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                      />
                    </div>
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
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Cidade / UF
                    </label>
                    <input
                      type="text"
                      value={formData.cityState}
                      onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                      placeholder="Ex: São Paulo / SP ou Curitiba / PR"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Observações / Detalhes de Aplicação
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Ex: Necessidade urgente para frota Scania, preferência por entrega via transportadora..."
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-red-950/50 hover:bg-red-500 transition-colors"
                    >
                      <Send className="h-4 w-4" />
                      <span>Transmitir Solicitação de Cotação</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
