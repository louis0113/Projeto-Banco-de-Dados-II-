import React, { useState } from 'react';
import { MapPin, Truck, CreditCard, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Checkout({ cartTotal, onBack }) {
  const [cep, setCep] = useState('');
  const [frete, setFrete] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

  const calcularFrete = () => {
    if (cep.replace(/\D/g, '').length === 8) {
      setFrete(25);
    } else {
      alert("Por favor, digite um CEP válido (8 dígitos).");
    }
  };

  if (finalizado) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in-95 duration-500">
        <div className="bg-green-100 p-6 rounded-full mb-6">
          <CheckCircle2 size={60} className="text-green-600" />
        </div>
        <h2 className="text-4xl font-black tracking-tighter text-black">OBRIGADO PELA COMPRA!</h2>
        <p className="text-gray-500 mt-2 font-medium">Seu pedido foi finalizado com sucesso.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-8 bg-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-zinc-800 transition shadow-xl"
        >
          VOLTAR PARA O INÍCIO
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-2 text-black">
          <CreditCard size={24} /> FINALIZAR COMPRA
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <Truck size={16} /> Frete
        </div>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="00000-000" 
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-black outline-none transition text-black"
          />
          <button 
            onClick={calcularFrete}
            className="bg-black text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-zinc-800 transition"
          >
            CALCULAR
          </button>
        </div>
        {frete > 0 && (
          <p className="text-sm text-green-600 font-bold animate-in slide-in-from-left-2">
            ✓ Frete fixo: R$ {frete.toFixed(2)}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <MapPin size={16} /> Endereço de Entrega
        </div>
        <input 
          type="text" 
          placeholder="Rua e Número" 
          className="w-full bg-gray-50 border-none rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-black text-black" 
        />
      </div>

      <div className="pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-500 font-medium">Total com frete</span>
          <span className="text-3xl font-black text-black">R$ {(cartTotal + frete).toFixed(2)}</span>
        </div>
        
        <button 
          onClick={() => setFinalizado(true)}
          disabled={frete === 0}
          className={`w-full py-5 rounded-2xl font-bold transition-all shadow-lg ${
            frete === 0 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-black text-white hover:bg-zinc-800 active:scale-95 shadow-black/10'
          }`}
        >
          {frete === 0 ? 'CALCULE O FRETE PARA LIBERAR' : 'CONFIRMAR PEDIDO'}
        </button>
      </div>
    </div>
  );
}