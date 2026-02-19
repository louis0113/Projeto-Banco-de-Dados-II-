import { ShoppingBag, Menu, User } from 'lucide-react'; // Adicionamos o User aqui
import { useCart } from '../context/CartContext';

export default function Header({ onLoginClick }) { // Adicionamos o onLoginClick aqui
  const { cartItems, setIsDrawerOpen } = useCart();
  const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b z-40 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Menu className="cursor-pointer" />
        <span className="text-xl font-black tracking-widest">MODA.LAB</span>
      </div>

      <div className="flex items-center gap-2">
        {/* NOVO BOTÃO DE LOGIN */}
        <button 
          onClick={onLoginClick} 
          className="p-2 hover:bg-gray-100 rounded-full transition"
          title="Fazer Login"
        >
          <User size={24} />
        </button>

        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="relative p-2 hover:bg-gray-100 rounded-full transition"
        >
          <ShoppingBag size={24} />
          {count > 0 && (
            <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {count}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}