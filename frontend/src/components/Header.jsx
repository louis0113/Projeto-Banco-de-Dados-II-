import { ShoppingBag, Menu, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header({ onLoginClick }) {
  const { cartItems, setIsDrawerOpen } = useCart();
  const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
  
    <nav className="fixed top-8 left-0 right-0 mx-auto w-[95%] max-w-7xl mt-4 bg-white/40 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/5 z-40 px-8 py-4 flex justify-between items-center rounded-2xl transition-all duration-500">
      
      <div className="flex items-center gap-6">
        <div className="p-2 hover:bg-white/50 rounded-full transition-colors cursor-pointer group">
          <Menu size={20} className="group-hover:rotate-180 transition-transform duration-500" />
        </div>
        <span className="text-xl font-black tracking-[0.3em] text-black/80">MODA.LAB</span>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onLoginClick} 
          className="p-3 bg-white/20 hover:bg-white/60 backdrop-blur-md rounded-full transition-all duration-300 active:scale-90 border border-white/30"
          title="Fazer Login"
        >
          <User size={20} strokeWidth={2.5} className="text-black/70" />
        </button>

        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="relative p-3 bg-black/5 hover:bg-black/10 backdrop-blur-md rounded-full transition-all duration-300 active:scale-90 border border-black/5"
        >
          <ShoppingBag size={20} strokeWidth={2.5} className="text-black/70" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black ring-2 ring-white/50 animate-bounce">
              {count}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}