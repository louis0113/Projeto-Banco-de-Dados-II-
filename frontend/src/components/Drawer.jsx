import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Drawer({ onCheckoutClick }) {
  const { isDrawerOpen, setIsDrawerOpen, cartItems, removeFromCart, cartTotal } = useCart();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)} />
      
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="p-6 flex justify-between items-center border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <h2 className="text-xl font-bold uppercase">Sua Sacola</h2>
          </div>
          <button onClick={() => setIsDrawerOpen(false)}><X size={24}/></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <ShoppingBag size={48} strokeWidth={1} className="mb-4" />
              <p>Seu carrinho está vazio.</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex gap-4">
                <img src={item.image} className="w-20 h-24 object-cover rounded-lg" />
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="font-bold text-sm">{item.name}</h4>
                    <p className="text-gray-500 text-xs">Qtd: {item.quantity}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="font-bold text-sm">R$ {item.price.toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500"><Trash2 size={16}/></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 bg-gray-50 border-t">
            <div className="flex justify-between text-xl font-black mb-6">
              <span>TOTAL</span>
              <span>R$ {cartTotal.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => {
                onCheckoutClick();
                setIsDrawerOpen(false);
              }}
              className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition"
            >
              FINALIZAR PEDIDO <ArrowRight size={18} />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}