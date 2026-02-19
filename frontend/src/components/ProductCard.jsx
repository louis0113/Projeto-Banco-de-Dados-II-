import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col group">
      <div className="relative overflow-hidden bg-gray-100 rounded-xl aspect-[4/5]">
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
        />
        <button 
          onClick={() => addToCart(product)}
          className="absolute bottom-4 left-4 right-4 bg-white text-black py-3 rounded-lg font-bold shadow-lg translate-y-12 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100"
        >
          Adicionar ao Carrinho
        </button>
      </div>
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.description}</p>
        </div>
        <p className="font-bold text-lg">R${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}