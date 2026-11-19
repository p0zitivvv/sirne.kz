'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { Search, UtensilsCrossed, Plus, Minus, ShoppingCart, X } from 'lucide-react';
import { categories, menuItems, MenuItem } from '@/data/menu';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

export default function MenuSection() {
  const { lang, t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const categoryNavRef = useRef<HTMLDivElement>(null);
  const categoryButtonsRef = useRef<Record<string, HTMLButtonElement | null>>({});
  const isClickScrolling = useRef(false);

  const { addItem, updateQuantity, items: cartItems } = useCart();

  const getItemQuantity = useCallback(
    (id: string) => {
      return cartItems.find((item) => item.id === id)?.quantity || 0;
    },
    [cartItems]
  );

  // Group items by category for full catalog layout
  const itemsByCategory = useMemo(() => {
    const map: Record<string, MenuItem[]> = {};
    for (const cat of categories) {
      map[cat.id] = [];
    }
    for (const item of menuItems) {
      if (map[item.category]) {
        map[item.category].push(item);
      }
    }
    return map;
  }, []);

  // Search filtered items
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return menuItems.filter(
      (item) =>
        item.nameRu.toLowerCase().includes(q) ||
        item.nameKz.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // Scroll active tab into view in the horizontal nav ONLY (never scrolls window)
  const scrollActiveTabIntoView = useCallback((catId: string) => {
    const btn = categoryButtonsRef.current[catId];
    const container = categoryNavRef.current;
    if (btn && container) {
      const btnLeft = btn.offsetLeft;
      const btnWidth = btn.offsetWidth;
      const containerWidth = container.clientWidth;
      const targetScroll = btnLeft - containerWidth / 2 + btnWidth / 2;

      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth',
      });
    }
  }, []);

  // Handle clicking a category tab
  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    scrollActiveTabIntoView(catId);

    const sectionEl = document.getElementById(`category-${catId}`);
    if (sectionEl) {
      isClickScrolling.current = true;
      sectionEl.scrollIntoView({ behavior: 'smooth' });

      // Re-enable scroll listener after animation finishes
      setTimeout(() => {
        isClickScrolling.current = false;
      }, 800);
    }
  };

  // Scroll spy to highlight active category ONLY when user is inside #menu
  useEffect(() => {
    if (searchQuery.trim()) return;

    const handleScroll = () => {
      if (isClickScrolling.current) return;

      const menuSection = document.getElementById('menu');
      if (!menuSection) return;

      const menuRect = menuSection.getBoundingClientRect();
      const headerOffset = 180;

      // Only spy when viewport intersects with the menu section
      if (menuRect.top > headerOffset || menuRect.bottom < headerOffset) {
        return;
      }

      const scrollPosition = window.scrollY + headerOffset;

      for (let i = categories.length - 1; i >= 0; i--) {
        const cat = categories[i];
        const el = document.getElementById(`category-${cat.id}`);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top - 30) {
            setActiveCategory((prev) => {
              if (prev !== cat.id) {
                scrollActiveTabIntoView(cat.id);
                return cat.id;
              }
              return prev;
            });
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchQuery, scrollActiveTabIntoView]);

  return (
    <section id="menu" className="py-20 sm:py-32 relative kazakh-pattern-bg">
      <div className="absolute inset-0 bg-dark/95 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="text-gold tracking-[0.3em] text-xs uppercase font-medium">
            {t.menu.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mt-4 mb-6 text-cream">
            {t.menu.titlePrefix}{' '}
            <span className="text-gold-gradient">{t.menu.titleHighlight}</span>
          </h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 0L18 6L12 12L6 6Z" fill="#C9A84C" />
            </svg>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto mb-8 sm:mb-12"
        >
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40"
              size={20}
            />
            <input
              type="text"
              placeholder={t.menu.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-dark-card border border-dark-border rounded-xl text-cream placeholder:text-cream/35 focus:border-gold/60 focus:outline-none transition-colors shadow-inner text-sm sm:text-base"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 hover:text-gold p-1"
                aria-label="Очистить поиск"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Sticky Category Navigation Bar */}
      {!searchQuery && (
        <div className="sticky top-20 z-30 bg-dark/95 backdrop-blur-xl border-y border-gold/20 py-2.5 shadow-xl shadow-black/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              ref={categoryNavRef}
              className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1 scroll-smooth"
            >
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                const catName = lang === 'kz' ? cat.nameKz : cat.nameRu;

                return (
                  <button
                    key={cat.id}
                    ref={(el) => {
                      categoryButtonsRef.current[cat.id] = el;
                    }}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap active:scale-95 ${
                      isActive
                        ? 'bg-gold text-dark font-bold shadow-md shadow-gold/25 ring-2 ring-gold/40'
                        : 'bg-dark-card border border-dark-border text-cream/60 hover:border-gold/40 hover:text-cream'
                    }`}
                  >
                    <span>{catName}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search Results View */}
        {searchQuery ? (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-cream/70 text-sm">
                {t.menu.foundCount}{' '}
                <span className="text-gold font-bold">{searchResults.length}</span>{' '}
                {t.menu.dishesWord}
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-gold/80 hover:text-gold underline"
              >
                Сбросить поиск
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {searchResults.map((item) => (
                  <DishCard
                    key={item.id}
                    item={item}
                    lang={lang}
                    quantity={getItemQuantity(item.id)}
                    onAdd={() => addItem(item)}
                    onUpdate={(delta) => updateQuantity(item.id, delta)}
                    addToCartText={t.menu.addToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-dark-card/40 rounded-2xl border border-dark-border">
                <UtensilsCrossed className="w-12 h-12 text-gold/30 mx-auto mb-3" />
                <p className="text-cream/40 text-base">{t.menu.notFound}</p>
              </div>
            )}
          </div>
        ) : (
          /* Grouped Categories View */
          <div className="space-y-16">
            {categories.map((cat) => {
              const catItems = itemsByCategory[cat.id] || [];
              if (catItems.length === 0) return null;

              const primaryTitle = lang === 'kz' ? cat.nameKz : cat.nameRu;
              const secondaryTitle = lang === 'kz' ? cat.nameRu : cat.nameKz;

              return (
                <div
                  key={cat.id}
                  id={`category-${cat.id}`}
                  className="scroll-mt-36 sm:scroll-mt-40"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-gold/15 pb-4 mb-6">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-cream">
                        {primaryTitle}
                      </h3>
                      {secondaryTitle && secondaryTitle !== primaryTitle && (
                        <p className="text-gold/70 text-xs sm:text-sm mt-0.5 italic">
                          {secondaryTitle}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-cream/40 font-mono">
                      {catItems.length}
                    </span>
                  </div>

                  {/* Dishes Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {catItems.map((item) => (
                      <DishCard
                        key={item.id}
                        item={item}
                        lang={lang}
                        quantity={getItemQuantity(item.id)}
                        onAdd={() => addItem(item)}
                        onUpdate={(delta) => updateQuantity(item.id, delta)}
                        addToCartText={t.menu.addToCart}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

interface DishCardProps {
  item: MenuItem;
  lang: 'ru' | 'kz';
  quantity: number;
  onAdd: () => void;
  onUpdate: (delta: number) => void;
  addToCartText: string;
}

function DishCard({ item, lang, quantity, onAdd, onUpdate, addToCartText }: DishCardProps) {
  const primaryName = lang === 'kz' ? item.nameKz : item.nameRu;
  const secondaryName = lang === 'kz' ? item.nameRu : item.nameKz;

  return (
    <div className="group glass-card rounded-2xl overflow-hidden hover:border-gold/40 transition-all duration-300 flex flex-col bg-dark-card/90 shadow-lg border border-gold/10">
      {/* Image container */}
      <div className="h-44 sm:h-48 bg-gradient-to-br from-dark-brown/40 to-graphite/40 relative overflow-hidden flex-shrink-0">
        {item.image ? (
          <img
            src={item.image}
            alt={primaryName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:scale-105 transition-transform duration-500">
            <UtensilsCrossed className="w-16 h-16 text-gold/30" />
          </div>
        )}
        <div className="absolute top-3 right-3 px-3.5 py-1 bg-gold text-dark text-sm font-bold rounded-full shadow-lg shadow-gold/20">
          {item.price > 0 ? `${item.price.toLocaleString()} ₸` : 'По запросу'}
        </div>
      </div>

      {/* Dish info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-lg font-bold text-cream font-[family-name:var(--font-heading)] leading-snug group-hover:text-gold transition-colors">
            {primaryName}
          </h4>
          {secondaryName && secondaryName !== primaryName && (
            <p className="text-gold/60 text-xs mt-0.5 italic">{secondaryName}</p>
          )}
          {item.description && (
            <p className="text-cream/50 text-xs sm:text-sm mt-2 leading-relaxed line-clamp-3">
              {item.description}
            </p>
          )}
        </div>

        {/* Cart controls */}
        <div className="mt-5 pt-4 border-t border-dark-border flex items-center justify-between">
          {quantity > 0 ? (
            <div className="flex items-center gap-3 bg-dark/70 rounded-xl p-1 border border-gold/30 w-full justify-between">
              <button
                type="button"
                onClick={() => onUpdate(-1)}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-graphite text-gold hover:bg-gold hover:text-dark transition-all active:scale-95"
                aria-label="Уменьшить"
              >
                <Minus size={16} />
              </button>
              <span className="text-cream font-bold text-sm px-2">{quantity}</span>
              <button
                type="button"
                onClick={() => onUpdate(1)}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-graphite text-gold hover:bg-gold hover:text-dark transition-all active:scale-95"
                aria-label="Увеличить"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onAdd}
              className="w-full py-2.5 px-4 bg-dark-card border border-gold/30 text-gold rounded-xl flex items-center justify-center gap-2 hover:bg-gold hover:text-dark transition-all duration-300 font-semibold text-xs sm:text-sm group/btn active:scale-98 shadow-sm"
            >
              <ShoppingCart
                size={16}
                className="group-hover/btn:scale-110 transition-transform"
              />
              <span>{addToCartText}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
