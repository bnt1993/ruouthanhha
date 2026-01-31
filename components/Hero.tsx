
import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Clock, Zap, Timer } from 'lucide-react';

const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });
  const [isSaleActive, setIsSaleActive] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        setIsSaleActive(false);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  return (
    <section id="home" className="relative min-h-[85vh] sm:h-[90vh] flex items-center overflow-hidden bg-brand-secondary py-20 sm:py-0">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&q=80&w=2070" 
          alt="Rượu ngâm thảo dược Thanh Hà truyền thống" 
          className="w-full h-full object-cover opacity-60 scale-105"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary via-brand-secondary/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/80 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          {/* Dynamic Sale Period Banner */}
          {isSaleActive && (
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 p-1.5 pr-6 rounded-2xl mb-8 sm:mb-12 animate-in fade-in slide-in-from-top-10 duration-1000 shadow-2xl">
              <div className="bg-brand-accent px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg">
                <Timer className="w-4 h-4 text-brand-secondary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-secondary">Ưu đãi giới hạn</span>
              </div>
              <div className="flex items-center gap-6">
                <p className="hidden sm:block text-[10px] font-black text-brand-accent uppercase tracking-widest">Flash Sale kết thúc sau:</p>
                <div className="flex gap-4">
                  {[
                    { val: timeLeft.hours, unit: 'Giờ' },
                    { val: timeLeft.minutes, unit: 'Phút' },
                    { val: timeLeft.seconds, unit: 'Giây' }
                  ].map((t, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <span className="text-xl sm:text-2xl font-black text-white tabular-nums leading-none mb-0.5">{t.val.toString().padStart(2, '0')}</span>
                      <span className="text-[7px] font-black text-white/30 uppercase tracking-widest">{t.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 mb-6 animate-in fade-in slide-in-from-left duration-700">
            <div className="flex text-brand-accent">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-current" />)}
            </div>
            <span className="text-white/80 text-[10px] sm:text-[12px] uppercase tracking-[0.3em] font-black">Ủ Chum Sành - Khử Độc Tố</span>
          </div>

          <h1 className="text-4xl sm:text-7xl md:text-9xl font-serif font-black text-white mb-8 leading-[1] sm:leading-[0.85] animate-in fade-in slide-in-from-left duration-700 delay-100 drop-shadow-2xl">
            Tinh Hoa <br/><span className="text-brand-accent underline decoration-brand-accent/30 decoration-8 underline-offset-16">Dược Tửu</span><br/>Thanh Hà
          </h1>
          
          <p className="text-gray-300 text-sm sm:text-xl mb-10 sm:mb-14 max-w-xl leading-relaxed animate-in fade-in slide-in-from-left duration-700 delay-200 font-medium italic">
            "Chắt lọc tinh túy từ đại ngàn Tây Bắc, mang hơi thở của đất mẹ vào từng giọt rượu quý bồi bổ sức khỏe."
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            <button 
              onClick={() => scrollToSection('products')}
              className="bg-brand-accent hover:bg-yellow-500 text-brand-secondary px-10 sm:px-14 py-5 sm:py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] sm:text-[13px] transition-all flex items-center justify-center gap-4 transform hover:scale-105 shadow-2xl group"
            >
              Mua sắm ngay <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
            </button>
            <button 
              onClick={() => scrollToSection('consult')}
              className="group border-2 border-white/20 hover:border-brand-accent hover:bg-white/5 text-white px-10 sm:px-14 py-5 sm:py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] sm:text-[13px] transition-all backdrop-blur-md flex items-center justify-center gap-4"
            >
              <Clock className="w-5 h-5 text-brand-accent" /> Tư vấn sức khỏe
            </button>
          </div>

          {/* Key Trust Badges */}
          <div className="mt-16 sm:mt-24 grid grid-cols-3 sm:flex sm:gap-16 border-t border-white/5 pt-10 sm:pt-12 animate-in fade-in duration-1000 delay-500">
             {[
               { val: '2004', label: 'Khởi nghiệp' },
               { val: '100%', label: 'Thảo dược' },
               { val: '24h', label: 'Giao hàng' },
             ].map((s, i) => (
               <div key={i} className="flex flex-col items-center sm:items-start group cursor-default">
                 <span className="text-2xl sm:text-4xl font-black text-white group-hover:text-brand-accent transition-colors leading-none mb-2">{s.val}</span>
                 <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-white/40">{s.label}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
