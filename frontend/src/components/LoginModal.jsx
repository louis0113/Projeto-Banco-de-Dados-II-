import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register } = useCart();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      let userData;
      if (isRegister) {
        userData = await register(email, password, fullName);
      } else {
        userData = await login(email, password);
      }

      // LÓGICA DE TRATAMENTO DE NOME
      // Prioridade: 1. Nome do Banco, 2. Nome do Input, 3. Nickname do Email
      const rawName = userData?.name || fullName || email.split('@')[0];
      
      const formattedUser = { 
        ...userData,
        name: rawName.toUpperCase(), 
        email: email 
      };

      onLoginSuccess(formattedUser); 
      
      // Limpa os campos
      setEmail('');
      setPassword('');
      setFullName('');
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Falha na autenticação.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute right-6 top-6 text-gray-400 hover:text-black transition-colors">
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-4xl font-black tracking-tighter text-black">
            {isRegister ? 'CRIAR CONTA' : 'BEM-VINDO'}
          </h2>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isRegister && (
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Nome Completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-black text-black"
                required
              />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Usuário ou e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-black text-black"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-black text-black"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600 font-semibold">{error}</p>}

          <button
            disabled={isLoading}
            className="w-full bg-black text-white py-4 rounded-2xl font-bold mt-4 hover:shadow-lg hover:shadow-black/20 transition-all active:scale-[0.98] disabled:opacity-60"
          >
            {isLoading ? 'AGUARDE...' : (isRegister ? 'FINALIZAR CADASTRO' : 'ENTRAR NA LOJA')}
          </button>
        </form>

        <div className="text-center mt-8">
          <button onClick={() => setIsRegister(!isRegister)} className="text-sm font-black text-black underline underline-offset-4">
            {isRegister ? 'Já tem uma conta? Fazer Login' : 'Ainda não é membro? Criar conta'}
          </button>
        </div>
      </div>
    </div>
  );
}

