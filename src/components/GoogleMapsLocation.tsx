import React, { useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import {
  MapPin,
  Navigation,
  ExternalLink,
  Copy,
  Check,
  Phone,
  Clock,
  Building2,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

const TERMICAR_LOCATION = {
  lat: -23.5768193,
  lng: -46.5551168,
};

export function GoogleMapsLocation() {
  const [infoWindowOpen, setInfoWindowOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const apiKey =
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
    'AIzaSyD0HIGjgsOVW0gVmn9BG-KUjzHWokhzCos';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      `${COMPANY_INFO.address.street}, ${COMPANY_INFO.address.neighborhood}, ${COMPANY_INFO.address.city} - ${COMPANY_INFO.address.state}, CEP ${COMPANY_INFO.address.zip}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const googleMapsRouteUrl = `https://www.google.com/maps/dir/?api=1&destination=${TERMICAR_LOCATION.lat},${TERMICAR_LOCATION.lng}`;
  const wazeRouteUrl = `https://www.waze.com/ul?ll=${TERMICAR_LOCATION.lat},${TERMICAR_LOCATION.lng}&navigate=yes`;

  return (
    <div className="mt-14 pt-10 border-t border-slate-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-500 mb-1">
            <MapPin className="h-4 w-4 text-red-500" />
            <span>Localização no Google Maps</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            Visite Nossa Fábrica em São Paulo
          </h3>
          <p className="mt-1 text-sm text-slate-300">
            Fácil acesso para transportadoras, frotas e clientes na região do bairro Santa Clara.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopyAddress}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>Endereço Copiado</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-400" />
                <span>Copiar Endereço</span>
              </>
            )}
          </button>

          <a
            href={googleMapsRouteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-red-500 shadow-md shadow-red-950/40 transition-colors"
          >
            <Navigation className="h-3.5 w-3.5" />
            <span>Traçar Rota no Google Maps</span>
          </a>

          <a
            href={wazeRouteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            <span>Abrir no Waze</span>
          </a>
        </div>
      </div>

      {/* Interactive Google Map Container */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl">
        <div className="h-[420px] sm:h-[480px] w-full">
          <APIProvider apiKey={apiKey}>
            <Map
              defaultCenter={TERMICAR_LOCATION}
              defaultZoom={16}
              mapId="DEMO_MAP_ID"
              gestureHandling="cooperative"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              className="h-full w-full"
            >
              <AdvancedMarker
                position={TERMICAR_LOCATION}
                onClick={() => setInfoWindowOpen(true)}
              >
                <Pin
                  background="#dc2626"
                  borderColor="#7f1d1d"
                  glyphColor="#ffffff"
                  scale={1.2}
                />
              </AdvancedMarker>

              {infoWindowOpen && (
                <InfoWindow
                  position={TERMICAR_LOCATION}
                  onCloseClick={() => setInfoWindowOpen(false)}
                >
                  <div className="p-2 text-slate-900 max-w-xs space-y-2">
                    <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                      <div className="h-7 w-7 rounded bg-red-600 flex items-center justify-center text-white shrink-0">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900 leading-tight">
                          Termicar Auto Peças
                        </div>
                        <div className="text-[10px] text-slate-500">Fundada em 1969</div>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-700 space-y-1">
                      <p className="font-medium">
                        {COMPANY_INFO.address.street}
                      </p>
                      <p className="text-slate-500">
                        Bairro {COMPANY_INFO.address.neighborhood} · São Paulo/SP
                      </p>
                      <p className="text-slate-500 font-mono">
                        CEP {COMPANY_INFO.address.zip}
                      </p>
                    </div>

                    <div className="pt-1 border-t border-slate-200 text-[10px] text-slate-600 flex items-center justify-between">
                      <span>Tel: {COMPANY_INFO.contact.phone}</span>
                      <a
                        href={googleMapsRouteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 font-bold hover:underline inline-flex items-center gap-0.5"
                      >
                        Como Chegar →
                      </a>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        </div>

        {/* Bottom Location Info Strip */}
        <div className="border-t border-slate-800 bg-slate-950/90 p-4 sm:p-5 backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Endereço da Fábrica:</span>
                <p className="text-slate-400 mt-0.5">
                  {COMPANY_INFO.address.street} - {COMPANY_INFO.address.neighborhood}, São Paulo - SP
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Recebimento & Expedição:</span>
                <p className="text-slate-400 mt-0.5">{COMPANY_INFO.contact.hours}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Phone className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Contato Imediato:</span>
                <p className="text-slate-400 mt-0.5 font-mono">
                  {COMPANY_INFO.contact.phone} · {COMPANY_INFO.contact.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Attribution */}
      <div className="text-[11px] text-slate-500 font-mono mt-2 text-right">
        Google Maps
      </div>
    </div>
  );
}
