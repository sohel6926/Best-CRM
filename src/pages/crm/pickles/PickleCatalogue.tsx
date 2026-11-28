import React, { useState } from 'react';
import { 
  Package, Search, Plus, Tag, Flame, Layers, 
  ShoppingBag, ShieldCheck, Download, CheckCircle2 
} from 'lucide-react';

interface PickleProduct {
  id: string;
  name: string;
  type: 'Veg Traditional' | 'Non-Veg Gourmet' | 'Seasonal Harvest' | 'Gift Hamper';
  baseOil: 'Cold-Pressed Sesame (Gingelly)' | 'Groundnut Oil' | 'Mustard Oil';
  shelfLife: string;
  fssaiCategory: string;
  skus: {
    packaging: '250g Glass Jar' | '500g Ceramic Bharani' | '1kg Food-Grade Pouch' | '5kg Bulk Tin';
    mrp: number;
    wholesaleRate: number;
    stockJars: number;
  }[];
}

export const PickleCatalogue: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);

  const [products, setProducts] = useState<PickleProduct[]>([
    {
      id: 'PKL-01',
      name: 'Nuzvid Aam Avakaya (Cut Mango with Mustard & Guntur Chilli)',
      type: 'Veg Traditional',
      baseOil: 'Cold-Pressed Sesame (Gingelly)',
      shelfLife: '12 Months',
      fssaiCategory: 'Pickled Fruit / Vegetables',
      skus: [
        { packaging: '250g Glass Jar', mrp: 180, wholesaleRate: 130, stockJars: 320 },
        { packaging: '500g Ceramic Bharani', mrp: 350, wholesaleRate: 260, stockJars: 180 },
        { packaging: '1kg Food-Grade Pouch', mrp: 620, wholesaleRate: 460, stockJars: 95 }
      ]
    },
    {
      id: 'PKL-02',
      name: 'Boneless Country Chicken Pickle (Kodi Achar)',
      type: 'Non-Veg Gourmet',
      baseOil: 'Groundnut Oil',
      shelfLife: '4 Months (Refrigerated)',
      fssaiCategory: 'Meat & Poultry Condiments (HACCP)',
      skus: [
        { packaging: '250g Glass Jar', mrp: 290, wholesaleRate: 220, stockJars: 210 },
        { packaging: '500g Ceramic Bharani', mrp: 560, wholesaleRate: 430, stockJars: 140 },
        { packaging: '1kg Food-Grade Pouch', mrp: 1050, wholesaleRate: 820, stockJars: 60 }
      ]
    },
    {
      id: 'PKL-03',
      name: 'Tenali Red Gongura Pickle with Whole Garlic Pods',
      type: 'Veg Traditional',
      baseOil: 'Cold-Pressed Sesame (Gingelly)',
      shelfLife: '9 Months',
      fssaiCategory: 'Herbal Leaf Pickle',
      skus: [
        { packaging: '250g Glass Jar', mrp: 160, wholesaleRate: 115, stockJars: 290 },
        { packaging: '500g Ceramic Bharani', mrp: 310, wholesaleRate: 230, stockJars: 165 },
        { packaging: '5kg Bulk Tin', mrp: 2400, wholesaleRate: 1800, stockJars: 18 }
      ]
    },
    {
      id: 'PKL-04',
      name: 'Godavari Prawn Pickle (Royyala Pachadi)',
      type: 'Non-Veg Gourmet',
      baseOil: 'Groundnut Oil',
      shelfLife: '4 Months',
      fssaiCategory: 'Seafood Condiment (HACCP)',
      skus: [
        { packaging: '250g Glass Jar', mrp: 340, wholesaleRate: 260, stockJars: 180 },
        { packaging: '500g Ceramic Bharani', mrp: 640, wholesaleRate: 500, stockJars: 85 }
      ]
    }
  ]);

  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<'Veg Traditional' | 'Non-Veg Gourmet' | 'Seasonal Harvest' | 'Gift Hamper'>('Veg Traditional');
  const [newPrice, setNewPrice] = useState(190);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const newProd: PickleProduct = {
      id: `PKL-0${products.length + 1}`,
      name: newName,
      type: newType,
      baseOil: 'Cold-Pressed Sesame (Gingelly)',
      shelfLife: newType === 'Non-Veg Gourmet' ? '4 Months' : '12 Months',
      fssaiCategory: 'Artisanal Jar Condiment',
      skus: [
        { packaging: '250g Glass Jar', mrp: newPrice, wholesaleRate: Math.round(newPrice * 0.75), stockJars: 100 },
        { packaging: '500g Ceramic Bharani', mrp: Math.round(newPrice * 1.9), wholesaleRate: Math.round(newPrice * 1.9 * 0.75), stockJars: 50 }
      ]
    };
    setProducts([...products, newProd]);
    setShowModal(false);
    setNewName('');
    onNotify?.(`New pickle recipe "${newName}" registered in Master Inventory!`);
  };

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'ALL' || p.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Title Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-[#5B21B6]">
              <Package className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-extrabold text-gray-900">Pickle Product Catalogue & Packaging Matrix</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Standard recipes across veg, gourmet non-veg, glass jars, and ceramic bharanis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNotify?.('Exported master pickle catalogue rate card!')}
            className="px-3.5 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Rate Card PDF</span>
          </button>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Pickle Variety</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search pickles by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
          />
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'Veg Traditional', 'Non-Veg Gourmet'].map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                typeFilter === t ? 'bg-[#5B21B6] text-white shadow-xs' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4 hover:border-purple-300 transition">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-extrabold text-[#5B21B6] bg-purple-50 px-2 py-0.5 rounded-md">
                  {p.id} • {p.type}
                </span>
                <h3 className="font-extrabold text-sm text-gray-900 mt-1.5">{p.name}</h3>
              </div>
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                p.type === 'Non-Veg Gourmet' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {p.shelfLife}
              </span>
            </div>

            {/* Packaging SKU Table */}
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className="text-[11px] font-extrabold text-gray-600 uppercase mb-2 flex justify-between">
                <span>Jar / Pouch</span>
                <span>Retail MRP</span>
                <span>Wholesale</span>
                <span>Ready Stock</span>
              </div>
              <div className="space-y-1.5">
                {p.skus.map((sku, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-semibold border-t border-gray-200/50 pt-1.5 first:border-0 first:pt-0">
                    <span className="font-bold text-gray-900">{sku.packaging}</span>
                    <span className="text-gray-800">₹{sku.mrp}</span>
                    <span className="text-emerald-700 font-extrabold">₹{sku.wholesaleRate}</span>
                    <span className="text-[11px] text-gray-500 font-bold bg-white px-2 py-0.5 rounded-md border border-gray-200">
                      {sku.stockJars} jars
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center text-[11px] text-gray-500 pt-1 border-t border-gray-100">
              <span>Oil: <span className="font-bold text-gray-700">{p.baseOil}</span></span>
              <span>FSSAI: <span className="font-bold text-gray-700">10020047000456</span></span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: New Pickle */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 animate-in fade-in">
            <h3 className="font-extrabold text-base text-gray-900">Add New Pickle Variant</h3>
            <form onSubmit={handleAddProduct} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Pickle Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mutton Kheema Pickle"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                >
                  <option value="Veg Traditional">Veg Traditional</option>
                  <option value="Non-Veg Gourmet">Non-Veg Gourmet</option>
                  <option value="Seasonal Harvest">Seasonal Harvest</option>
                  <option value="Gift Hamper">Gift Hamper</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">250g Jar MRP (₹)</label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5B21B6] text-white text-xs font-bold rounded-xl hover:bg-[#4C1D95] cursor-pointer"
                >
                  Save to Catalogue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
