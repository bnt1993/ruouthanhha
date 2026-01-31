
import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Phone, Heart, Sparkles, ChevronRight } from 'lucide-react';

interface Props {
  onOpenCart: () => void;
  cartCount: number;
}

const Navbar: React.FC<Props> = ({ onOpenCart, cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    setIsOpen(false);
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

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-brand-secondary/95 backdrop-blur-md h-16 sm:h-20 shadow-xl' : 'bg-transparent h-20 sm:h-24'}`}>
        <div className="max-w-7xl mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo - Scale down on mobile */}
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex items-center gap-2 sm:gap-3 group">
              <div className="bg-brand-accent p-1.5 sm:p-2 rounded-lg sm:rounded-2xl shadow-lg transform group-hover:rotate-12 transition-transform">
                <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-brand-secondary fill-current" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm sm:text-2xl font-serif font-black tracking-widest leading-none text-white uppercase">THANH HÀ</span>
                <span className="text-[6px] sm:text-[9px] tracking-[0.3em] uppercase text-brand-accent font-black">Tinh hoa rượu ngâm</span>
              </div>
            </button>
            
            {/* Actions - Larger tap areas for mobile */}
            <div className="flex items-center gap-1 sm:gap-4">
              <button 
                onClick={onOpenCart} 
                className="group p-3 sm:p-3 hover:bg-white/10 rounded-xl transition-all relative flex items-center gap-2"
                aria-label="Giỏ hàng"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-brand-accent" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brand-accent text-brand-secondary text-[8px] font-black w-4.5 h-4.5 sm:w-6 sm:h-6 flex items-center justify-center rounded-lg shadow-lg border border-brand-secondary">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden lg:block text-[10px] font-black text-white uppercase tracking-widest">Giỏ hàng</span>
              </button>

              <a href="tel:0901234567" className="hidden sm:flex items-center gap-2 bg-brand-accent px-4 py-2 rounded-xl text-brand-secondary font-black text-[9px] uppercase tracking-widest hover:bg-white transition-all">
                <Phone className="w-3.5 h-3.5" />
                <span>090.123.4567</span>
              </a>

              <button 
                onClick={() => setIsOpen(true)} 
                className="p-3 bg-white/10 rounded-xl text-white active:scale-90 transition-transform"
                aria-label="Menu"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer - Tối ưu cử chỉ và chiều rộng */}
      <div className={`fixed inset-0 z-[150] transition-all duration-500 ${isOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-brand-secondary/80 backdrop-blur-md transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />
        
        <div className={`absolute right-0 top-0 h-full w-[85%] max-w-[300px] bg-brand-secondary shadow-2xl transition-transform duration-500 ease-out transform flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          <div className="flex items-center justify-between p-6 border-b border-white/5">
             <div className="flex flex-col">
                <span className="text-lg font-serif font-black text-white">THANH HÀ</span>
                <span className="text-[7px] font-black text-brand-accent uppercase tracking-widest mt-1">Sản phẩm thủ công</span>
             </div>
             <button 
              onClick={() => setIsOpen(false)}
              className="p-3 bg-white/5 rounded-xl text-white active:scale-90"
             >
               <X className="w-5 h-5" />
             </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-2 no-scrollbar">
            {[
              { id: 'home', label: 'Trang Chủ' },
              { id: 'products', label: 'Sản Phẩm' },
              { id: 'consult', label: 'Tư Vấn AI' },
              { id: 'contact', label: 'Liên Hệ' }
            ].map((item, idx) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center justify-between p-5 rounded-xl bg-white/5 text-white active:bg-brand-accent/10 transition-all text-left"
              >
                <span className="text-lg font-serif font-black">{item.label}</span>
                <ChevronRight className="w-4 h-4 text-brand-accent" />
              </button>
            ))}

            <div className="mt-8 p-6 rounded-2xl bg-brand-accent/5 border border-brand-accent/10">
               <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-4 h-4 text-brand-accent" />
                  <span className="text-[9px] font-black text-brand-accent uppercase tracking-widest">Hotline 24/7</span>
               </div>
               <a href="tel:0901234567" className="flex items-center justify-center gap-2 bg-brand-accent text-brand-secondary py-4 rounded-xl font-black text-[10px] uppercase shadow-lg">
                 <Phone className="w-4 h-4" /> 090.123.4567
               </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
