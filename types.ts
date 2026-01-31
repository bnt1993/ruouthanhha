
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  benefits: string[];
  badges?: string[];
  // Bổ sung cho SEO và Thông số kỹ thuật
  origin?: string;
  volume?: string;
  alcoholContent?: string;
  agingTime?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export enum Category {
  DượcLiệuQuý = 'Dược Liệu Quý',
  SâmVàNấm = 'Sâm & Nấm',
  TráiCâyRừng = 'Trái Cây Rừng',
  HỗTrợSứcKhỏe = 'Hỗ Trợ Sức Khỏe'
}
