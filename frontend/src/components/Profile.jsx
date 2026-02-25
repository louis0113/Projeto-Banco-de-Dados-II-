import { useState } from 'react';
import { Package, MapPin, Ticket, Settings, LogOut, ChevronRight, ChevronLeft, Box, User, Lock, Bell, CheckCircle2 } from 'lucide-react';

const Profile = ({ user, onLogout }) => {
    const [view, setView] = useState('menu'); 
    const [selectedOrder, setSelectedOrder] = useState(null); 
    const [notifications, setNotifications] = useState(true);
    const [isChangingPass, setIsChangingPass] = useState(false);

    const orders = [
        { id: '#8842', date: '12/02/2026', status: 'Entregue', total: 'R$ 450,00', items: ['Urban T-Shirt 01', 'Silence Pant Black'] },
        { id: '#9120', date: 'Ontem', status: 'Em transporte', total: 'R$ 199,90', items: ['Tech Cap Oversize'] },
    ];

    return (
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-zinc-950/60 p-[1px] shadow-2xl backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-500 w-full min-h-[460px] flex flex-col text-zinc-100">

            {/* HEADER DO PERFIL */}
            <div className="relative z-10 p-6 border-b border-white/5 bg-white/5">
                {view === 'menu' ? (
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/90 shadow-xl rounded-full flex items-center justify-center text-zinc-900 text-lg font-black">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                            <h3 className="font-black text-[13px] uppercase tracking-tighter text-white">
                                {user?.name || 'SISTEMA'}
                            </h3>
                            <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest flex items-center gap-1">
                                <CheckCircle2 size={10} className="text-zinc-500" /> Sistema Verificado
                            </p>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => {
                            if (view === 'detalhe-pedido') setView('pedidos');
                            else setView('menu');
                            setIsChangingPass(false);
                        }}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-all group"
                    >
                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-all" />
                        <span className="font-black text-[10px] uppercase tracking-[0.3em]">Voltar</span>
                    </button>
                )}
            </div>

            {/* CONTEÚDO SCROLLÁVEL */}
            <div className="relative z-10 flex-1 p-3 overflow-y-auto max-h-[380px]">

                {view === 'menu' && (
                    <div className="space-y-2">
                        <button onClick={() => setView('pedidos')} className="w-full flex items-center justify-between p-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 rounded-2xl transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-white/10 text-white rounded-xl group-hover:bg-white group-hover:text-black transition-all"><Package size={16} /></div>
                                <div className="text-left"><p className="text-[11px] font-black uppercase tracking-wider">Meus Pedidos</p></div>
                            </div>
                            <ChevronRight size={14} className="text-zinc-600 group-hover:text-white transition-all" />
                        </button>

                        <button onClick={() => setView('config')} className="w-full flex items-center justify-between p-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 rounded-2xl transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-white/10 text-white rounded-xl group-hover:bg-white group-hover:text-black transition-all"><Settings size={16} /></div>
                                <div className="text-left"><p className="text-[11px] font-black uppercase tracking-wider">Configurações</p></div>
                            </div>
                            <ChevronRight size={14} className="text-zinc-600 group-hover:text-white transition-all" />
                        </button>
                    </div>
                )}

                {view === 'pedidos' && (
                    <div className="space-y-2 animate-in slide-in-from-right-8 duration-500">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                onClick={() => { setSelectedOrder(order); setView('detalhe-pedido'); }}
                                className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/[0.06] transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-zinc-500 group-hover:text-white transition-all"><Box size={18} /></div>
                                    <div>
                                        <p className="text-[11px] font-black">{order.id}</p>
                                        <p className="text-[9px] text-zinc-500 font-bold uppercase">{order.date}</p>
                                    </div>
                                </div>
                                <ChevronRight size={14} className="text-zinc-700" />
                            </div>
                        ))}
                    </div>
                )}

                {view === 'detalhe-pedido' && selectedOrder && (
                    <div className="p-2 animate-in slide-in-from-right-8 duration-500">
                        <div className="bg-white/[0.03] border border-white/5 rounded-[24px] p-5 shadow-inner">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-[14px] font-black text-white">{selectedOrder.id}</p>
                                    <p className="text-[9px] text-zinc-500 font-bold uppercase">{selectedOrder.date}</p>
                                </div>
                                <span className="bg-white/10 text-white text-[8px] px-3 py-1 rounded-full font-black uppercase border border-white/10">{selectedOrder.status}</span>
                            </div>

                            <div className="space-y-3 mb-6">
                                <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Inventory</p>
                                {selectedOrder.items.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2 text-[11px] font-bold text-zinc-300">
                                        <div className="w-1 h-1 bg-white/20 rounded-full" /> {item}
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-white/5 flex justify-between items-center text-white">
                                <span className="text-[10px] font-black uppercase text-zinc-500">Subtotal</span>
                                <span className="text-[12px] font-black">{selectedOrder.total}</span>
                            </div>
                        </div>
                    </div>
                )}

                {view === 'config' && (
                    <div className="p-1 animate-in slide-in-from-right-8 duration-500 space-y-3">
                        <div className="p-5 bg-white/[0.03] rounded-[24px] border border-white/5">
                            <p className="text-[9px] font-black text-zinc-600 uppercase mb-4 tracking-widest">Security Protocol</p>
                            <div className="flex items-center gap-3 mb-4"><User size={14} className="text-zinc-500"/><span className="text-[11px] font-bold">{user?.name}</span></div>
                            <div className="flex items-center gap-3">
                                <Lock size={14} className="text-zinc-500"/><span className="text-[11px] font-black tracking-widest">••••••••</span>
                                <button onClick={() => setIsChangingPass(!isChangingPass)} className="ml-auto text-[10px] font-black bg-white/10 hover:bg-white hover:text-black text-white px-3 py-1 rounded-full uppercase transition-all">
                                    {isChangingPass ? 'Cancel' : 'Modify'}
                                </button>
                            </div>
                            {isChangingPass && (
                                <div className="mt-4 space-y-2 p-3 bg-black/40 rounded-xl border border-white/5 animate-in slide-in-from-top-4">
                                    <input type="password" placeholder="NEW PASSWORD" className="w-full bg-white/5 p-3 text-[10px] font-black border-none rounded-lg outline-none text-white placeholder:text-zinc-700" />
                                    <button className="w-full py-3 bg-white/10 hover:bg-white hover:text-black text-white text-[9px] font-black rounded-lg uppercase tracking-widest transition-all">Execute Update</button>
                                </div>
                            )}
                        </div>

                        <button onClick={() => setNotifications(!notifications)} className={`w-full p-4 flex items-center gap-3 rounded-2xl transition-all border ${notifications ? 'bg-white/[0.08] border-white/10' : 'bg-transparent border-transparent opacity-40'}`}>
                            <div className={`p-2 rounded-lg transition-all ${notifications ? 'bg-white text-black' : 'bg-zinc-800'}`}><Bell size={14} /></div>
                            <span className="text-[11px] font-black uppercase tracking-widest">Notifications</span>
                            <div className={`ml-auto w-9 h-5 rounded-full p-1 transition-all ${notifications ? 'bg-zinc-400' : 'bg-zinc-800'}`}>
                                <div className={`w-3 h-3 bg-white rounded-full transition-all ${notifications ? 'translate-x-4' : 'translate-x-0'}`} />
                            </div>
                        </button>
                    </div>
                )}
            </div>

            {/* FOOTER - SAIR */}
            <div className="relative z-10 p-4 bg-white/[0.02] backdrop-blur-md border-t border-white/5">
                <button onClick={onLogout} className="w-full py-4 bg-white/[0.03] hover:bg-red-500 hover:text-white border border-white/5 rounded-2xl text-[10px] font-black transition-all uppercase tracking-[0.3em] flex items-center justify-center gap-2 group">
                    <LogOut size={14} className="group-hover:-translate-x-1 transition-all" /> Sair
                </button>
            </div>
        </div>
    );
};

export default Profile;

