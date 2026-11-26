import React, { useState } from 'react';
import { 
  Camera, Image, Sparkles, Plus, Share2, 
  ExternalLink, CheckCircle2, Eye, Filter, Heart 
} from 'lucide-react';

interface PhotoItem {
  id: string;
  title: string;
  category: 'Wedding Buffets' | 'Live Counters' | 'Royal Plating' | 'Dessert Extravaganza';
  dishHighlights: string;
  platesScale: string;
  tags: string[];
  views: number;
}

export const CateringPhotos: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const photos: PhotoItem[] = [
    {
      id: 'PH-101',
      title: 'Grand Telugu Royal Wedding Buffet Counter',
      category: 'Wedding Buffets',
      dishHighlights: 'Live Brass Handi Pulao, 12 Traditional Podi Display, Avakaya Jaadi counter',
      platesScale: '1,600 Plates • N Convention',
      tags: ['Traditional', 'Brass Degs', 'Royal'],
      views: 340,
    },
    {
      id: 'PH-102',
      title: 'Interactive Live Jalebi & Rabdi Tawa Counter',
      category: 'Live Counters',
      dishHighlights: 'Hot Golden Kesar Jalebis served on earthen clay kulhads with thickened rabdi',
      platesScale: '800 Guests • Fort Grand',
      tags: ['Live Sweet', 'Clay Kulhad', 'Crowd Favorite'],
      views: 520,
    },
    {
      id: 'PH-103',
      title: 'VIP 24-Course Silver Thali Banquet Plating',
      category: 'Royal Plating',
      dishHighlights: 'Silver katoris with Gutti Vankaya, Pulao, Ghee Podi, Kheer & Paan Shots',
      platesScale: '150 VIP Dignitaries',
      tags: ['Silver Service', 'Fine Dining', 'Sit-down'],
      views: 290,
    },
    {
      id: 'PH-104',
      title: 'Artisan Hyderabadi Dessert & Paan Studio',
      category: 'Dessert Extravaganza',
      dishHighlights: 'Double Ka Meetha, Apricot Delight, Badam Halwa & Flambéed Malpua',
      platesScale: '1,200 Plates • Hitex Hall 2',
      tags: ['Desserts', 'Flambé', 'Luxury'],
      views: 410,
    },
  ];

  const filtered = photos.filter(p => activeCategory === 'ALL' || p.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Client Sales Presentation</span>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] mt-0.5">Food Photos & High-Res Portfolio Showcase</h2>
          <p className="text-xs text-[#64748B]">
            Present authentic buffet setups, live counters & silver thali banquets to prospective wedding clients.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNotify?.('WhatsApp digital portfolio link copied to clipboard!')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share Portfolio with Client</span>
          </button>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['ALL', 'Wedding Buffets', 'Live Counters', 'Royal Plating', 'Dessert Extravaganza'].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#5B21B6] text-white shadow-xs'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photo Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-3">
            <div className="h-44 rounded-xl bg-gradient-to-br from-purple-100 via-indigo-50 to-amber-50 flex flex-col items-center justify-center border border-purple-100 relative group overflow-hidden">
              <Camera className="h-10 w-10 text-[#5B21B6]/50 mb-2" />
              <span className="text-xs font-extrabold text-[#1E1B4B]">{item.title}</span>
              <span className="text-[11px] text-gray-500">{item.platesScale}</span>
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-[10px] font-bold text-[#5B21B6] shadow-xs">
                {item.category}
              </span>
            </div>

            <div>
              <h4 className="font-extrabold text-sm text-[#1E1B4B]">{item.title}</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{item.dishHighlights}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                {item.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold">
                    #{t}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onNotify?.(`Generated client quote deck slide for ${item.title}!`)}
                className="font-bold text-[#5B21B6] hover:underline"
              >
                Add to Quote Deck →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
