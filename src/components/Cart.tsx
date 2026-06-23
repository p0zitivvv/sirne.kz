'use client';

import { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Send, MapPin, Phone, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
    const { items, totalAmount, totalItems, updateQuantity, clearCart } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: ''
    });

    const sanitizeInput = (str: string) => {
        return str.replace(/[<>'"&]/g, '').trim().slice(0, 200);
    };

    const handleCheckout = () => {
        if (items.length === 0) return;
        if (!formData.name || !formData.phone || !formData.address) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        const cleanName = sanitizeInput(formData.name);
        const cleanPhone = sanitizeInput(formData.phone);
        const cleanAddress = sanitizeInput(formData.address);

        const message = `*Новый заказ с сайта SIRNE.KZ*\n` +
            `-------------------------\n` +
            items.map((item, idx) => `${idx + 1}. ${item.nameRu} x${item.quantity} — ${item.price * item.quantity} ₸`).join('\n') +
            `\n-------------------------\n` +
            `*Итого:* ${totalAmount} ₸\n\n` +
            `*Клиент:* ${cleanName}\n` +
            `*Тел:* ${cleanPhone}\n` +
            `*Адрес:* ${cleanAddress}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/77714953014?text=${encodedMessage}`;

        window.location.assign(whatsappUrl);
    };

    return (
        <>
            {/* Floating Cart Button */}
            <AnimatePresence>
                {totalItems > 0 && !isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 p-4 bg-gold text-dark rounded-full shadow-2xl shadow-gold/20 flex items-center justify-center hover:scale-110 transition-transform"
                    >
                        <ShoppingCart size={24} />
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-dark">
                            {totalItems}
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Cart Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full max-w-md bg-dark-card border-l border-dark-border z-[70] shadow-2xl flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-dark-border flex items-center justify-between">
                                <h2 className="text-xl font-bold text-cream flex items-center gap-3">
                                    <ShoppingCart className="text-gold" />
                                    Ваш заказ
                                </h2>
                                <button onClick={() => setIsOpen(false)} className="text-cream/50 hover:text-gold transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Cart Items */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {items.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                                        <ShoppingCart size={64} className="mb-4" />
                                        <p className="text-lg">Корзина пока пуста</p>
                                    </div>
                                ) : (
                                    items.map((item) => (
                                        <div key={item.id} className="flex gap-4 group">
                                            <div className="w-16 h-16 bg-graphite rounded shadow-inner flex items-center justify-center overflow-hidden">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.nameRu} className="w-full h-full object-cover" />
                                                ) : (
                                                    <ShoppingCart className="text-gold/20" size={20} />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-cream text-sm font-medium">{item.nameRu}</h4>
                                                <p className="text-gold text-xs mt-1 font-bold">{item.price} ₸</p>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="w-7 h-7 flex items-center justify-center rounded border border-gold/30 text-gold hover:bg-gold hover:text-dark transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="text-cream text-sm w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-7 h-7 flex items-center justify-center rounded border border-gold/30 text-gold hover:bg-gold hover:text-dark transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Checkout Form */}
                            {items.length > 0 && (
                                <div className="p-6 border-t border-dark-border bg-dark/40 space-y-4">
                                    <div className="space-y-3">
                                        <div className="relative">
                                            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" />
                                            <input
                                                type="text"
                                                placeholder="Ваше имя"
                                                className="w-full pl-10 pr-4 py-2 text-sm bg-dark-card border border-dark-border rounded focus:border-gold/50 outline-none text-cream"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="relative">
                                            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" />
                                            <input
                                                type="tel"
                                                placeholder="Телефон"
                                                className="w-full pl-10 pr-4 py-2 text-sm bg-dark-card border border-dark-border rounded focus:border-gold/50 outline-none text-cream"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="relative">
                                            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" />
                                            <input
                                                type="text"
                                                placeholder="Адрес доставки"
                                                className="w-full pl-10 pr-4 py-2 text-sm bg-dark-card border border-dark-border rounded focus:border-gold/50 outline-none text-cream"
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <div className="flex justify-between text-cream font-bold mb-4">
                                            <span>Итого:</span>
                                            <span className="text-gold">{totalAmount} ₸</span>
                                        </div>
                                        <button
                                            onClick={handleCheckout}
                                            className="w-full py-3.5 bg-gold text-dark font-bold rounded flex items-center justify-center gap-2 hover:bg-gold/90 transition-colors"
                                        >
                                            <Send size={18} />
                                            Заказать через WhatsApp
                                        </button>
                                        <p className="text-center text-[10px] text-cream/30 mt-3">
                                            Нажимая на кнопку, вы перейдете в чат WhatsApp с оператором
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
