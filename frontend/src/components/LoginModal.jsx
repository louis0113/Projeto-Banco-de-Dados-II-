import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const [isRegister, setIsRegister] = useState(false);
  if (!isOpen) return null;

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
          <p className="text-gray-500 text-sm mt-2">
            {isRegister ? 'Preencha seus dados para começar.' : 'Acesse sua conta para continuar.'}
          </p>
        </div>

        <button className="w-full flex items-center justify-center gap-3 border-2 border-gray-100 py-3 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all mb-6">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" className="w-5 h-5" />
          {isRegister ? 'Cadastrar com Google' : 'Entrar com Google'}
        </button>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-100"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase tracking-widest">Ou use seu e-mail</span>
          <div className="flex-grow border-t border-gray-100"></div>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {isRegister && (
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <input type="text" placeholder="Nome Completo" className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-black" />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input type="email" placeholder="E-mail" className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-black" />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input type="password" placeholder="Senha" className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-black" />
          </div>

          <button className="w-full bg-black text-white py-4 rounded-2xl font-bold mt-4 hover:shadow-lg hover:shadow-black/20 transition-all active:scale-[0.98]">
            {isRegister ? 'FINALIZAR CADASTRO' : 'ENTRAR NA LOJA'}
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            {isRegister ? 'Já tem uma conta?' : 'Ainda não é membro?'}
            <button 
              onClick={() => setIsRegister(!isRegister)} 
              className="ml-2 font-black text-black underline underline-offset-4 hover:text-zinc-700"
            >
              {isRegister ? 'Fazer Login' : 'Criar conta agora'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}