import { MapPin, Truck, CreditCard } from 'lucide-react';

export default function Checkout({ cartTotal }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-8">
      <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
        <CreditCard size={24} /> FINALIZAR COMPRA
      </h2>

      {/* Seção de Entrega */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase">
          <Truck size={16} /> Cálculo de Frete
        </div>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="00000-000" 
            className="flex-1 bg-gray-50 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
          />
          <button className="bg-gray-200 px-4 py-3 rounded-lg font-bold text-sm hover:bg-gray-300 transition">
            CALCULAR
          </button>
        </div>
      </div>

      {/* Endereço */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase">
          <MapPin size={16} /> Endereço de Entrega
        </div>
        <input type="text" placeholder="Rua / Avenida" className="w-full bg-gray-50 border-none rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black" />
        <div className="grid grid-cols-2 gap-2">
          <input type="text" placeholder="Número" className="bg-gray-50 border-none rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black" />
          <input type="text" placeholder="Bairro" className="bg-gray-50 border-none rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black" />
        </div>
      </div>

      <div className="pt-6 border-t">
        <div className="flex justify-between text-2xl font-black">
          <span>TOTAL</span>
          <span>R$ {(cartTotal + 25).toFixed(2)}</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">* Já incluso frete fixo de R$ 25,00</p>
      </div>
    </div>
  );
}