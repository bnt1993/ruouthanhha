
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import AIConsultant from './components/AIConsultant';
import CartDrawer from './components/CartDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import FilterDrawer from './components/FilterDrawer';
import Testimonials from './components/Testimonials';
import { PRODUCTS } from './constants';
import { useCart } from './hooks/useCart';
import { Product, Category } from './types';
import { 
  ShieldCheck, Truck, Clock, Leaf, MessageSquare, ShoppingBag, 
  Sparkles, ChevronRight, Search, SlidersHorizontal, Lightbulb, 
  Heart, Facebook, Instagram, Youtube, Music2, X
} from 'lucide-react';

const App: React.FC = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Filter States
  const [activeCategory, setActiveCategory] = useState<string>('Tất Cả');
  const [priceRange, setPriceRange] = useState<string>('Tất Cả');

  // Smart Suggested Products
  const [suggestedProducts, setSuggestedProducts] = useState<(Product & { reason?: string })[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const categories = ['Tất Cả', ...Object.values(Category)];
  const priceRanges = [
    { label: 'Tất Cả', min: 0, max: Infinity },
    { label: 'Dưới 500k', min: 0, max: 500000 },
    { label: '500k - 1tr', min: 500000, max: 1000000 },
    { label: '1tr - 2tr', min: 1000000, max: 2000000 },
    { label: 'Trên 2tr', min: 2000000, max: Infinity },
  ];

  const reasons = [
    "Phù hợp làm quà biếu",
    "Bồi bổ sức khỏe toàn diện",
    "Bán chạy nhất tuần qua",
    "Dành cho người cao tuổi",
    "Hương vị êm dịu dễ uống",
    "Được các quý ông tin dùng"
  ];

  useEffect(() => {
    const shuffle = () => {
      setIsRefreshing(true);
      setTimeout(() => {
        const shuffled = [...PRODUCTS]
          .sort(() => 0.5 - Math.random())
          .slice(0, 4)
          .map(p => ({
            ...p,
            reason: reasons[Math.floor(Math.random() * reasons.length)]
          }));
        setSuggestedProducts(shuffled);
        setIsRefreshing(false);
      }, 500);
    };

    shuffle();
    const interval = setInterval(shuffle, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    addToCart(product, quantity);
  };

  const handleBuyNow = (product: Product, quantity: number = 1) => {
    addToCart(product, quantity);
    setIsDetailOpen(false);
    setIsCartOpen(true);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const categoryMatch = activeCategory === 'Tất Cả' || product.category === activeCategory;
      const range = priceRanges.find(r => r.label === priceRange) || priceRanges[0];
      const priceMatch = product.price >= range.min && product.price < range.max;
      return categoryMatch && priceMatch;
    });
  }, [activeCategory, priceRange]);

  const resetFilters = () => {
    setActiveCategory('Tất Cả');
    setPriceRange('Tất Cả');
  };

  const socials = [
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, url: 'https://facebook.com/ruoungamthanhha' },
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, url: '#' },
    { name: 'Youtube', icon: <Youtube className="w-5 h-5" />, url: '#' },
    { name: 'TikTok', icon: <Music2 className="w-5 h-5" />, url: '#' },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-brand-light">
      <Navbar onOpenCart={() => setIsCartOpen(true)} cartCount={totalItems} />
      
      <main>
        <Hero />

        {/* Trust Section */}
        <section aria-label="Cam kết thương hiệu" className="bg-brand-secondary py-12 sm:py-28 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex overflow-x-auto pb-4 no-scrollbar sm:grid sm:grid-cols-4 gap-6 sm:gap-16">
              {[
                { icon: <ShieldCheck />, label: "Thượng Hạng", sub: "Kiểm định nghiêm ngặt" },
                { icon: <Truck />, label: "Giao Hỏa Tốc", sub: "Toàn quốc 2-3 ngày" },
                { icon: <Clock />, label: "Ủ Chum Sành", sub: "Khử độc tố hoàn toàn" },
                { icon: <Leaf />, label: "Thuần Tự Nhiên", sub: "Dược liệu rừng 100%" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center text-white min-w-[150px] sm:min-w-0 group cursor-default">
                  <div className="text-brand-accent mb-4 sm:mb-8 p-4 sm:p-7 rounded-2xl sm:rounded-[2.5rem] bg-white/5 group-hover:bg-brand-accent group-hover:text-brand-secondary transition-all duration-700 shadow-2xl border border-white/5">
                    {React.cloneElement(item.icon as React.ReactElement, { className: "w-8 h-8 sm:w-12 sm:h-12" })}
                  </div>
                  <h3 className="font-black text-xs sm:text-base uppercase tracking-widest mb-1 sm:mb-3">{item.label}</h3>
                  <p className="text-[8px] sm:text-[10px] text-stone-500 font-bold uppercase tracking-[0.2em] leading-tight">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Catalog Section */}
        <section id="products" className="py-12 sm:py-36 bg-[#faf9f6]">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center mb-8 sm:mb-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent/10 text-brand-accent rounded-full mb-6 sm:mb-8 border border-brand-accent/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em]">Tinh hoa rượu ngâm</span>
              </div>
              <h2 className="text-3xl sm:text-7xl font-serif font-black text-brand-secondary leading-[1.1] sm:leading-[0.85] mb-10 sm:mb-16">
                Danh Mục <br/><span className="text-brand-accent">Sản Phẩm</span>
              </h2>
              
              {/* Refined Filter UI */}
              <div className="w-full space-y-6">
                {/* Mobile Filter Controls */}
                <div className="flex flex-col md:hidden gap-4 px-2">
                  <div className="flex overflow-x-auto gap-2 no-scrollbar pb-1">
                    {categories.map((cat) => (
                      <button 
                        key={cat} 
                        onClick={() => setActiveCategory(cat)} 
                        className={`whitespace-nowrap px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all shadow-sm ${activeCategory === cat ? 'bg-brand-secondary text-white' : 'bg-white text-gray-400 border border-stone-100'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setIsFilterOpen(true)}
                    className="flex items-center justify-center gap-2 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-sm"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-brand-accent" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-secondary">Lọc theo giá tiền</span>
                  </button>
                </div>

                {/* Desktop Filter Controls */}
                <div className="hidden md:flex flex-wrap justify-center gap-4">
                  {categories.map((cat) => (
                    <button 
                      key={cat} 
                      onClick={() => setActiveCategory(cat)} 
                      className={`px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${activeCategory === cat ? 'bg-brand-secondary text-white border-brand-secondary shadow-xl' : 'bg-white text-gray-400 border-stone-200 hover:border-brand-accent'}`}
                    >
                      {cat}
                    </button>
                  ))}
                  <button 
                    onClick={() => setIsFilterOpen(true)}
                    className="px-8 py-3.5 rounded-full bg-white border border-stone-200 text-brand-secondary hover:bg-stone-50 transition-all flex items-center gap-2"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-brand-accent" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Lọc thêm</span>
                  </button>
                </div>

                {/* Active Filter Chips */}
                {(activeCategory !== 'Tất Cả' || priceRange !== 'Tất Cả') && (
                  <div className="flex flex-wrap justify-center gap-2 px-4 animate-in fade-in zoom-in-95 duration-300">
                    {activeCategory !== 'Tất Cả' && (
                      <div className="inline-flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/20 px-3 py-1.5 rounded-full">
                        <span className="text-[9px] font-black text-brand-accent uppercase">{activeCategory}</span>
                        <button onClick={() => setActiveCategory('Tất Cả')}><X className="w-3 h-3 text-brand-accent" /></button>
                      </div>
                    )}
                    {priceRange !== 'Tất Cả' && (
                      <div className="inline-flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/20 px-3 py-1.5 rounded-full">
                        <span className="text-[9px] font-black text-brand-accent uppercase">{priceRange}</span>
                        <button onClick={() => setPriceRange('Tất Cả')}><X className="w-3 h-3 text-brand-accent" /></button>
                      </div>
                    )}
                    <button 
                      onClick={resetFilters}
                      className="text-[9px] font-black text-gray-400 uppercase underline underline-offset-4 decoration-stone-200 hover:text-brand-secondary transition-colors"
                    >
                      Xóa tất cả lọc
                    </button>
                  </div>
                )}
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-10 lg:gap-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 flex flex-col items-center justify-center text-center bg-white rounded-[2rem] sm:rounded-[4rem] border border-stone-100 shadow-sm mx-auto max-w-3xl px-6">
                <Search className="w-12 h-12 text-stone-100 mb-6" />
                <h3 className="text-2xl font-serif font-black text-brand-secondary mb-4">Chưa tìm thấy loại rượu này</h3>
                <button onClick={resetFilters} className="bg-brand-secondary text-white px-10 py-5 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl">Quay lại danh sách</button>
              </div>
            )}
          </div>
        </section>

        {/* AI Recommendations */}
        <section className="py-16 sm:py-40 bg-white border-t border-gray-100 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 sm:mb-16 gap-6">
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 text-brand-accent text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em]">
                  <Lightbulb className="w-4 h-4 fill-current animate-pulse" /> Dành riêng cho bạn
                </div>
                <h2 className="text-3xl sm:text-6xl font-serif font-black text-brand-secondary leading-tight">Gợi Ý Thông Minh</h2>
              </div>
              <button 
                onClick={() => scrollToSection('products')} 
                className="group flex items-center gap-3 text-[9px] sm:text-[11px] font-black uppercase tracking-widest text-brand-secondary bg-stone-50 px-6 py-4 rounded-xl border border-stone-200"
              >
                Khám phá thêm <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-accent" />
              </button>
            </div>
            
            <div className={`flex overflow-x-auto pb-10 gap-4 sm:gap-16 no-scrollbar transition-all duration-1000 ${isRefreshing ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
              {suggestedProducts.map(product => (
                <div key={product.id} className="min-w-[240px] xs:min-w-[280px] sm:min-w-[420px] lg:min-w-0 lg:flex-1 relative group/suggest">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-40 bg-brand-secondary text-brand-accent px-4 py-1.5 rounded-lg text-[7px] sm:text-[8px] font-black uppercase tracking-widest shadow-2xl border border-white/10 whitespace-nowrap">
                    {product.reason}
                  </div>
                  <ProductCard 
                    product={product} 
                    onAddToCart={handleAddToCart} 
                    onBuyNow={handleBuyNow} 
                    onViewDetails={handleViewDetails} 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />
        <AIConsultant />
      </main>

      {/* Floating Action Center */}
      <div className="fixed bottom-6 right-4 sm:bottom-10 sm:right-8 z-[60] flex flex-col gap-4">
        <button 
          onClick={() => scrollToSection('consult')} 
          className="bg-brand-secondary text-white p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-2xl border border-white/10 active:scale-90 transition-transform"
          aria-label="Tư vấn AI"
        >
          <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
        <button 
          onClick={() => setIsCartOpen(true)} 
          className="bg-brand-accent text-brand-secondary p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-2xl relative active:scale-90 transition-transform"
          aria-label="Xem giỏ hàng"
        >
          <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-[9px] sm:text-[11px] font-black w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg sm:rounded-2xl shadow-2xl border-2 sm:border-4 border-white">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      <FilterDrawer 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        categories={categories}
        priceRanges={priceRanges}
        resetFilters={resetFilters}
        totalResults={filteredProducts.length}
      />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} totalPrice={totalPrice} clearCart={clearCart} />

      <ProductDetailModal 
        isOpen={isDetailOpen}
        product={selectedProduct}
        onClose={() => setIsDetailOpen(false)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <footer id="contact" className="bg-brand-secondary text-white pt-20 pb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-white/5" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-brand-accent fill-current" />
                <span className="text-2xl font-serif font-black tracking-widest uppercase">THANH HÀ</span>
              </div>
              <p className="text-stone-500 text-xs sm:text-sm max-w-sm leading-relaxed font-medium mb-8">
                Gìn giữ giá trị dược tửu Việt từ năm 2004. Cam kết mang đến những sản phẩm rượu ngâm thượng hạng từ nguyên liệu tự nhiên.
              </p>
              <div className="flex gap-4">
                {socials.map((social) => (
                  <a 
                    key={social.name} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-accent hover:text-brand-secondary hover:border-brand-accent hover:shadow-lg transition-all transform hover:-translate-y-1" 
                    aria-label={`Theo dõi chúng tôi trên ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-accent mb-6">Hỗ Trợ</h4>
              <ul className="space-y-4 text-[10px] font-bold text-stone-400">
                <li className="hover:text-white cursor-pointer transition-colors">Bảo mật thông tin</li>
                <li className="hover:text-white cursor-pointer transition-colors">Chính sách đổi trả</li>
                <li className="hover:text-white cursor-pointer transition-colors">Vận chuyển toàn quốc</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-accent mb-6">Kết Nối</h4>
              <ul className="space-y-4 text-[10px] font-bold text-stone-400">
                <li className="flex items-center gap-3"><Clock className="w-4 h-4 text-brand-accent" /> 08:00 - 22:00</li>
                <li className="flex items-center gap-3"><Truck className="w-4 h-4 text-brand-accent" /> Giao hàng nhanh</li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-stone-600 text-[9px] font-black uppercase tracking-[0.2em] text-center">© 2024 Rượu Ngâm Thanh Hà - Tinh Hoa Dược Tửu</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
