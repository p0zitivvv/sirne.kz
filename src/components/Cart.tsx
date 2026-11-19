'use client';

import { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Send, MapPin, Phone, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
  const { items, totalAmount, totalItems, updateQuantity } = useCart();
  const { lang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const sanitizeInput = (str: string) => {
    return str.replace(/[<>'"&]/g, '').trim().slice(0, 200);
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    if (!formData.name || !formData.phone || !formData.address) {
      alert(t.cart.alertFillAll);
      return;
    }

    const cleanName = sanitizeInput(formData.name);
    const cleanPhone = sanitizeInput(formData.phone);
    const cleanAddress = sanitizeInput(formData.address);

    const message =
      `${t.cart.newOrderTitle}\n` +
      `-------------------------\n` +
      items
        .map(
          (item, idx) =>
            `${idx + 1}. ${lang === 'kz' ? item.nameKz : item.nameRu} x${
              item.quantity
            } — ${(item.price * item.quantity).toLocaleString()} ₸`
        )
        .join('\n') +
      `\n-------------------------\n` +
      `*${t.cart.total}* ${totalAmount.toLocaleString()} ₸\n\n` +
      `*${t.cart.clientLabel}:* ${cleanName}\n` +
      `*${t.cart.phoneLabel}:* ${cleanPhone}\n` +
      `*${t.cart.addressLabel}:* ${cleanAddress}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/77714953014?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Floating Cart Button (comfortably above bottom action bar on mobile) */}
      <AnimatePresence>
        {totalItems > 0 && !isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 lg:bottom-8 right-4 lg:right-8 z-40 p-4 bg-gold text-dark rounded-full shadow-2xl shadow-gold/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
            aria-label="Открыть корзину"
          >
            <ShoppingCart size={24} />
            <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-dark shadow-md">
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
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-dark-card border-l border-gold/20 z-[70] shadow-2xl flex flex-col pb-[env(safe-area-inset-bottom)]"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-dark-border flex items-center justify-between bg-dark">
                <h2 className="text-xl font-bold text-cream flex items-center gap-3 font-[family-name:var(--font-heading)]">
                  <ShoppingCart className="text-gold" />
                  <span>{t.cart.title}</span>
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full border border-dark-border flex items-center justify-center text-cream/60 hover:text-gold transition-colors"
                  aria-label="Закрыть"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-16">
                    <ShoppingCart size={56} className="mb-4 text-gold/40" />
                    <p className="text-base text-cream">{t.cart.empty}</p>
                  </div>
                ) : (
                  items.map((item) => {
                    const itemName = lang === 'kz' ? item.nameKz : item.nameRu;
                    return (
                      <div
                        key={item.id}
                        className="flex gap-4 p-3 rounded-xl bg-dark/50 border border-gold/10 hover:border-gold/25 transition-colors"
                      >
                        <div className="w-16 h-16 bg-graphite rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={itemName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ShoppingCart className="text-gold/30" size={20} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-cream text-sm font-semibold truncate">
                            {itemName}
                          </h4>
                          <p className="text-gold text-xs mt-1 font-bold">
                            {(item.price * item.quantity).toLocaleString()} ₸
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center rounded-md border border-gold/30 text-gold hover:bg-gold hover:text-dark transition-colors"
                              aria-label="Уменьшить"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-cream text-xs font-bold w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-md border border-gold/30 text-gold hover:bg-gold hover:text-dark transition-colors"
                              aria-label="Увеличить"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Checkout Form */}
              {items.length > 0 && (
                <div className="p-5 sm:p-6 border-t border-dark-border bg-dark/80 space-y-4">
                  <div className="space-y-2.5">
                    <div className="relative">
                      <User
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/50"
                      />
                      <input
                        type="text"
                        placeholder={t.cart.namePlaceholder}
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-dark-card border border-dark-border rounded-xl focus:border-gold/60 outline-none text-cream"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="relative">
                      <Phone
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/50"
                      />
                      <input
                        type="tel"
                        placeholder={t.cart.phonePlaceholder}
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-dark-card border border-dark-border rounded-xl focus:border-gold/60 outline-none text-cream"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="relative">
                      <MapPin
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/50"
                      />
                      <input
                        type="text"
                        placeholder={t.cart.addressPlaceholder}
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-dark-card border border-dark-border rounded-xl focus:border-gold/60 outline-none text-cream"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between items-center text-cream font-bold mb-4 text-base">
                      <span>{t.cart.total}</span>
                      <span className="text-gold text-lg">
                        {totalAmount.toLocaleString()} ₸
                      </span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full py-3.5 bg-gold hover:bg-gold-light text-dark font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-gold/20 active:scale-98 transition-all"
                    >
                      <Send size={16} />
                      <span>{t.cart.orderWhatsApp}</span>
                    </button>
                    <p className="text-center text-[10px] text-cream/40 mt-2.5">
                      {t.cart.notice}
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
