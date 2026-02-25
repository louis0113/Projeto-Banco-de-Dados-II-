import { useState, useEffect } from 'react';
import Header from './components/Header';
import Drawer from './components/Drawer';
import ProductCard from './components/ProductCard';
import LoginModal from './components/LoginModal';
import Checkout from './components/Checkout';
import Profile from './components/Profile'; 
import { CartProvider, useCart } from './context/CartContext';
import axios from 'axios';

function MainContent() {
  const { cartTotal } = useCart();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showProfile, setShowProfile] = useState(false); 
  const [filter, setFilter] = useState('Todos');
  const [data, setData] = useState([]);

  // Estado do usuário limpo (sem fake login)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    // Retorna o usuário salvo ou null se não houver ninguém
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setData(response.data);
      } catch {
        console.warn("Backend offline. Usando dados de teste.");
        setData([
          { _id: '1', name: 'URBAN T-SHIRT 01', price: 199.90, category: 'Camisetas', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000' },
          { _id: '2', name: 'SILENCE PANT BLACK', price: 349.00, category: 'Calças', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000' },
          { _id: '3', name: 'LAB JACKET V2', price: 599.00, category: 'Casacos', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000' },
          { _id: '4', name: 'TECH CAP OVERSIZE', price: 89.90, category: 'Acessórios', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000' },
        ]);
      }
    };
    fetchProducts();
  }, []);

  const handleAccountClick = () => {
    if (user) {
      setShowProfile(!showProfile);
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setShowProfile(false);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoginOpen(false);
    setShowProfile(true); // Abre o perfil automaticamente após o login
  };

  const filteredProducts = filter === 'Todos' 
    ? data
    : data.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {!showCheckout && (
        <div className="fixed top-0 w-full z-[30] px-4 pt-2">
          <div className="max-w-7xl mx-auto h-9 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center shadow-2xl">
            <p className="text-white text-[9px] font-black tracking-[0.25em] uppercase px-4 text-center">
              FRETE GRÁTIS EM COMPRAS ACIMA DE R$ 299 • 10% OFF NA PRIMEIRA COMPRA
            </p>
          </div>
        </div>
      )}

      {!showCheckout && (
        <div className="pt-6"> 
          <Header onLoginClick={handleAccountClick} />
        </div>
      )}

      {showProfile && user && (
        <div className="fixed top-24 right-6 z-[50] w-80 animate-in fade-in slide-in-from-top-4 duration-300">
          <Profile user={user} onLogout={handleLogout} />
        </div>
      )}
      
      <main className={`max-w-7xl mx-auto px-6 pb-20 ${!showCheckout ? 'pt-24' : 'pt-10'}`}>
        {!showCheckout ? (
          <>
            {/* Banner e Filtros aqui... (omitido para brevidade) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {filteredProducts.map(p => (
                <ProductCard key={p._id || p.id} product={p} />
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setShowCheckout(false)}
              className="group mb-12 text-[10px] font-black flex items-center gap-3 bg-zinc-100 hover:bg-black hover:text-white px-8 py-4 rounded-full transition-all tracking-[0.2em] uppercase"
            >
              <span>←</span> Voltar para a Galeria
            </button>
            <Checkout cartTotal={cartTotal} />
          </div>
        )}
      </main>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <Drawer onCheckoutClick={() => setShowCheckout(true)} />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}

export default App;
