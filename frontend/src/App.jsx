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

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header onLoginClick={() => setIsLoginOpen(true)} />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {!showCheckout ? (
          <>
            <div className="mb-12">
              <h1 className="text-6xl font-black tracking-tighter text-black">NEW DROP</h1>
              <p className="text-gray-500 font-medium">Temporada Outono/Inverno 2026</p>
            </div>
            {/* Grid de Produtos Lado a Lado */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <button 
              onClick={() => setShowCheckout(false)}
              className="mb-8 text-sm font-bold flex items-center gap-2 hover:underline"
            >
              ← VOLTAR PARA A LOJA
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