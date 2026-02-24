import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Drawer({ onCheckoutClick }) {
  const { isDrawerOpen, setIsDrawerOpen, cartItems, removeFromCart, cartTotal } = useCart();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsDrawerOpen(false)} 
      />
      
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <h2 className="text-xl font-bold uppercase tracking-tighter text-black">Sua Sacola</h2>
          </div>
          <button onClick={() => setIsDrawerOpen(false)} className="hover:rotate-90 transition-transform duration-200">
            <X size={24}/>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-300">
              <ShoppingBag size={60} strokeWidth={1} />
              <p className="mt-4 font-medium">Sua sacola está vazia.</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item._id} className="flex gap-4 border-b border-gray-50 pb-4">
                <img src={item.image} className="w-20 h-24 object-cover rounded-lg shadow-sm" alt={item.name} />
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="font-bold text-sm text-gray-800 uppercase">{item.name}</h4>
                    <p className="text-gray-400 text-xs font-bold mt-1">QTD: {item.quantity}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="font-black text-sm text-black">R$ {item.price.toFixed(2)}</p>
                    <button 
                      onClick={() => removeFromCart(item._id)} 
                      className="text-red-400 hover:text-red-600 transition p-1"
                    >
                      <Trash2 size={18}/>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between text-2xl font-black text-black mb-6 tracking-tighter">
              <span>TOTAL</span>
              <span>R$ {cartTotal.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => {
                onCheckoutClick(); 
                setIsDrawerOpen(false); 
              }}
              className="w-full bg-black text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-zinc-800 transition active:scale-95 shadow-xl"
            >
              FECHAR PEDIDO <ArrowRight size={20} />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
