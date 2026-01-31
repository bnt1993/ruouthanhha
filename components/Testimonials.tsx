
import React from 'react';
import { Star, Quote, CheckCircle2, User } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Nguyễn Văn Hùng',
    location: 'Hà Nội',
    content: 'Bình rượu Đinh Lăng điêu khắc rồng phượng thực sự là một tác phẩm nghệ thuật. Tôi trưng bày ở phòng khách ai cũng trầm trồ. Vị rượu êm, không bị nồng gắt.',
    rating: 5,
    avatar: 'H',
    date: '15/10/2023'
  },
  {
    id: 2,
    name: 'Trần Thị Mai',
    location: 'TP. Hồ Chí Minh',
    content: 'Tôi mua rượu Sim biếu bố mẹ, các cụ rất thích vì dễ uống và tốt cho tiêu hóa. Đóng gói 5 lớp cực kỳ chắc chắn, vận chuyển vào Nam mà không sứt mẻ gì.',
    rating: 5,
    avatar: 'M',
    date: '02/11/2023'
  },
  {
    id: 3,
    name: 'Lê Minh đức',
    location: 'Quảng Ninh',
    content: 'Tư vấn AI rất thông minh, giúp tôi chọn được loại rượu Ba Kích chuẩn vị rừng. Thanh Hà làm việc rất chuyên nghiệp, sẽ còn ủng hộ lâu dài.',
    rating: 5,
    avatar: 'Đ',
    date: '20/12/2023'
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 sm:py-28 bg-[#faf9f6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-12 sm:mb-20 text-center">
          <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-brand-accent/20 mb-4" />
          <h2 className="text-3xl sm:text-6xl font-serif font-black text-brand-secondary mb-4">
            Khách Hàng <span className="text-brand-accent">Nói Gì?</span>
          </h2>
          <div className="w-20 h-1 bg-brand-accent rounded-full mb-6"></div>
          <p className="text-gray-500 text-xs sm:text-base max-w-xl font-medium uppercase tracking-widest">
            Sự hài lòng của quý khách là niềm tự hào của Thanh Hà
          </p>
        </div>

        <div className="flex overflow-x-auto pb-10 gap-6 sm:gap-8 no-scrollbar snap-x">
          {REVIEWS.map((review) => (
            <div 
              key={review.id} 
              className="min-w-[300px] sm:min-w-[400px] bg-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-stone-100 snap-center flex flex-col hover:shadow-xl transition-shadow duration-500"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-brand-accent text-brand-accent" />
                ))}
              </div>
              
              <p className="text-gray-600 italic text-sm sm:text-lg leading-relaxed mb-8 flex-1">
                "{review.content}"
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-stone-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-secondary text-brand-accent rounded-2xl flex items-center justify-center font-black text-lg shadow-lg">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="text-[11px] sm:text-sm font-black text-brand-secondary uppercase tracking-wider">{review.name}</h4>
                    <p className="text-[9px] font-bold text-gray-400 uppercase">{review.location}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                   <div className="flex items-center gap-1.5 text-[8px] font-black text-green-600 uppercase tracking-tighter bg-green-50 px-2 py-1 rounded-full mb-1">
                     <CheckCircle2 className="w-3 h-3" /> Đã mua hàng
                   </div>
                   <span className="text-[8px] text-gray-300 font-bold">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 sm:gap-16 opacity-40 grayscale">
           <img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Vietnamese_Standard_Logo.png" alt="Standard 1" className="h-8 sm:h-12 object-contain" />
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-secondary">Báo chí nói về chúng tôi</p>
           <img src="https://upload.wikimedia.org/wikipedia/commons/a/af/VTV_logo.png" alt="Standard 2" className="h-4 sm:h-6 object-contain" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
