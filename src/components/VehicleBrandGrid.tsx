import { Truck, ChevronRight } from 'lucide-react';
import { VEHICLE_BRANDS } from '../data/products';

interface VehicleBrandGridProps {
  onSelectBrand: (brand: string) => void;
}

const BRAND_DETAILS = [
  {
    name: 'Mercedes-Benz',
    models: '1113, 1313, 1513, 1618, 1620, Actros, Axor, Atego, Linha Ônibus OF/OH',
    parts: 'Pinos de embreagem, terminais de freio motor, esticadores OM352/366',
  },
  {
    name: 'Scania',
    models: '112, 113, Série 4 (114/124), Linha PGR (R420, R440, G380), Ônibus K112/K113',
    parts: 'Terminais de aceleração reforçados DIN 71802, esticadores de alternador',
  },
  {
    name: 'Volvo',
    models: 'FH12, FH13, FM10, FM12, NH12, VM 260/310, Motores D12 e D13',
    parts: 'Tirantes de suspensão, parafusos ocos calibrados, rótulas especiais',
  },
  {
    name: 'Volkswagen',
    models: 'Delivery 8.150, 9.150, Worker, Constellation 19.320, 24.250, 25.370',
    parts: 'Terminais de comando angular M6 e M8, articulações de alavanca',
  },
  {
    name: 'Ford',
    models: 'Cargo 815, 1119, 1722, 2428, 2842, Linha F-4000, F-350',
    parts: 'Pinos esféricos com cupilha, terminais de cabo e hastes',
  },
  {
    name: 'Iveco',
    models: 'Daily 35S14, 55C16, Eurocargo, Stralis 380/420/460, Trakker',
    parts: 'Articulações mecânicas, parafusos ocos duplos para compressores',
  },
  {
    name: 'Agrale',
    models: 'Marruá, Caminhões 6000, 8500, 9200, Chassis de Microônibus Volare',
    parts: 'Pinos de articulação especial, terminais esféricos para direção e freio',
  },
  {
    name: 'Agrícola',
    models: 'Tratores Massey Ferguson, Valtra, New Holland, John Deere, Colheitadeiras',
    parts: 'Terminais pesados, pinos com canal de cupilha para acoplamentos',
  },
];

export function VehicleBrandGrid({ onSelectBrand }: VehicleBrandGridProps) {
  const handleClick = (brandName: string) => {
    onSelectBrand(brandName);
    const catalogEl = document.getElementById('produtos');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="aplicacoes" className="py-20 border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-500 mb-2">
            <span>Compatibilidade Ampla</span>
            <span aria-hidden="true">·</span>
            <span>Montadoras do Mercado Nacional</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
            Aplicações para as Principais Frotas do País
          </h2>
          <p className="mt-2 text-base text-slate-300">
            Peças desenvolvidas e testadas segundo as mais rigorosas especificações das montadoras,
            com garantia de encaixe perfeito e alta durabilidade sob regime severo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BRAND_DETAILS.map((brand, i) => (
            <div
              key={i}
              onClick={() => handleClick(brand.name)}
              className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-200 hover:border-red-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-red-950/20 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-red-400">
                    <Truck className="h-5 w-5" />
                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                      {brand.name}
                    </h3>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                </div>

                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium">Modelos:</span>
                    <p className="text-slate-300 font-normal leading-relaxed">
                      {brand.models}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Itens em Linha:</span>
                    <p className="text-slate-400 leading-relaxed">
                      {brand.parts}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs text-red-400 font-semibold group-hover:text-red-300">
                <span>Filtrar peças no catálogo</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
