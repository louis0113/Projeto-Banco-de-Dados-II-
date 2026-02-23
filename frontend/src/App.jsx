import React, { useState } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Drawer from './components/Drawer';
import LoginModal from './components/LoginModal';
import Checkout from './components/Checkout';
import { CartProvider, useCart } from './context/CartContext';
import { products } from './data/products';

function MainContent() {
  const { cartTotal } = useCart();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [filter, setFilter] = useState('Todos');

  const filteredProducts = filter === 'Todos' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      
      {!showCheckout && (
        <div className="fixed top-0 w-full z-[30] px-4 pt-2">
          <div className="max-w-7xl mx-auto h-9 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center shadow-2xl shadow-black/20 animate-in fade-in slide-in-from-top-2 duration-500">
            <p className="text-white text-[9px] font-black tracking-[0.25em] uppercase px-4 text-center">
              FRETE GRÁTIS EM COMPRAS ACIMA DE R$ 299 • 10% OFF NA PRIMEIRA COMPRA
            </p>
          </div>
        </div>
      )}

      {!showCheckout && (
        <div className="pt-6"> 
          <Header onLoginClick={() => setIsLoginOpen(true)} />
        </div>
      )}
      
      <main className={`max-w-7xl mx-auto px-6 pb-20 ${!showCheckout ? 'pt-24' : 'pt-10'}`}>
        {!showCheckout ? (
          <>
            <section className="relative w-full h-[75vh] rounded-[40px] overflow-hidden mb-16 group shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2000" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Banner Coleção"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-16">
                <span className="text-white text-xs font-bold tracking-[0.5em] mb-6 animate-pulse opacity-70">LIMITED DROP</span>
                <h1 className="text-white text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85]">
                  URBAN<br/>SILENCE
                </h1>
                <button className="bg-white text-black font-black py-5 px-12 rounded-full w-fit hover:bg-zinc-200 transition-all active:scale-95 shadow-xl">
                  SHOP NOW
                </button>
              </div>
            </section>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div>
                <h2 className="text-5xl font-black tracking-tighter">NEW ITEMS</h2>
                <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[9px] mt-2">Season 2026 / Lab Edition</p>
              </div>
              
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {['Todos', 'Camisetas', 'Calças', 'Casacos', 'Acessórios'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-8 py-3 rounded-full text-[10px] font-black tracking-widest transition-all border-2 ${
                      filter === cat 
                      ? 'bg-black border-black text-white shadow-lg' 
                      : 'border-gray-100 text-gray-400 hover:border-black hover:text-black'
                    }`}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              {filteredProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={() => setShowCheckout(false)}
              className="group mb-12 text-[10px] font-black flex items-center gap-3 bg-zinc-100 hover:bg-black hover:text-white px-8 py-4 rounded-full transition-all tracking-[0.2em] uppercase"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Voltar para a Galeria
            </button>
            <Checkout cartTotal={cartTotal} />
          </div>
        )}
      </main>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
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