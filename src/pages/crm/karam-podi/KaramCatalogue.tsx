import React, { useState } from 'react';
import { 
  Package, Search, Plus, Tag, Flame, ShieldCheck, 
  Layers, ShoppingBag, Edit3, CheckCircle2, Download
} from 'lucide-react';

interface PodiProduct {
  id: string;
  name: string;
  spiceLevel: 'Mild' | 'Medium' | 'Fiery Hot' | 'Extra Guntur Spice';
  hsn: string;
  shelfLife: string;
  fssaiCategory: string;
  skus: {
    size: '100g' | '250g' | '500g' | '1kg' | '5kg Bulk';
    mrp: number;
    wholesaleRate: number;
    inStockUnits: number;
  }[];
}

export const KaramCatalogue: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [products, setProducts] = useState<PodiProduct[]>([
    {
      id: 'PODI-01',
      name: 'Nalla Karam Podi (Black Sesame & Roasted Garlic)',
      spiceLevel: 'Fiery Hot',
      hsn: '21069099',
      shelfLife: '6 Months',
      fssaiCategory: 'Proprietary Food - Spice Mix',
      skus: [
        { size: '100g', mrp: 90, wholesaleRate: 65, inStockUnits: 340 },
        { size: '250g', mrp: 210, wholesaleRate: 155, inStockUnits: 180 },
        { size: '500g', mrp: 390, wholesaleRate: 290, inStockUnits: 95 },
        { size: '1kg', mrp: 720, wholesaleRate: 540, inStockUnits: 40 }
      ]
    },
    {
      id: 'PODI-02',
      name: 'Guntur Idli Karam (Traditional Byadgi & Chana Blend)',
      spiceLevel: 'Medium',
      hsn: '21069099',
      shelfLife: '6 Months',
      fssaiCategory: 'Spice & Condiments',
      skus: [
        { size: '100g', mrp: 85, wholesaleRate: 60, inStockUnits: 420 },
        { size: '250g', mrp: 195, wholesaleRate: 140, inStockUnits: 260 },
        { size: '500g', mrp: 370, wholesaleRate: 275, inStockUnits: 110 },
        { size: '5kg Bulk', mrp: 3200, wholesaleRate: 2400, inStockUnits: 15 }
      ]
    },
    {
      id: 'PODI-03',
      name: 'Karivepaku (Curry Leaf & Cold-Pressed Gingelly)',
      spiceLevel: 'Mild',
      hsn: '21069099',
      shelfLife: '5 Months',
      fssaiCategory: 'Herbal Spice Condiment',
      skus: [
        { size: '100g', mrp: 95, wholesaleRate: 70, inStockUnits: 280 },
        { size: '250g', mrp: 225, wholesaleRate: 165, inStockUnits: 140 },
        { size: '500g', mrp: 420, wholesaleRate: 310, inStockUnits: 65 }
      ]
    },
    {
      id: 'PODI-04',
      name: 'Kandi Podi (Toor Dal Gunpowder with Cumin)',
      spiceLevel: 'Medium',
      hsn: '21069099',
      shelfLife: '6 Months',
      fssaiCategory: 'Pulses & Seasoning',
      skus: [
        { size: '100g', mrp: 80, wholesaleRate: 58, inStockUnits: 390 },
        { size: '250g', mrp: 185, wholesaleRate: 135, inStockUnits: 210 },
        { size: '1kg', mrp: 680, wholesaleRate: 510, inStockUnits: 55 }
      ]
    }
  ]);

  const [newName, setNewName] = useState('');
  const [newSpice, setNewSpice] = useState<'Mild' | 'Medium' | 'Fiery Hot' | 'Extra Guntur Spice'>('Medium');
  const [new100gRate, setNew100gRate] = useState(85);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const newProd: PodiProduct = {
      id: `PODI-0${products.length + 1}`,
      name: newName,
      spiceLevel: newSpice,
      hsn: '21069099',
      shelfLife: '6 Months',
      fssaiCategory: 'Artisanal Spice Mix',
      skus: [
        { size: '100g', mrp: new100gRate, wholesaleRate: Math.round(new100gRate * 0.72), inStockUnits: 150 },
        { size: '250g', mrp: Math.round(new100gRate * 2.3), wholesaleRate: Math.round(new100gRate * 2.3 * 0.72), inStockUnits: 80 }
      ]
    };
    setProducts([...products, newProd]);
    setShowModal(false);
    setNewName('');
    onNotify?.(`New product "${newName}" added to Master Catalogue!`);
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Title Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-[#5B21B6]">
              <Package className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-extrabold text-gray-900">Product Catalogue & Pack Matrix</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Standardized SKU configurations across 100g, 250g, 500g pouches and 1kg/5kg bulk hotel packs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNotify?.('Price list and HSN compliance catalogue downloaded as PDF!')}
            className="px-3.5 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Download Rate Card</span>
          </button>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Variety</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search podi varieties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
        />
      </div>

      {/* Catalogue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4 hover:border-purple-300 transition">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-extrabold text-[#5B21B6] bg-purple-50 px-2 py-0.5 rounded-md">
                  {p.id} • HSN {p.hsn}
                </span>
                <h3 className="font-extrabold text-sm text-gray-900 mt-1.5">{p.name}</h3>
              </div>
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                p.spiceLevel === 'Fiery Hot' || p.spiceLevel === 'Extra Guntur Spice' 
                  ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
              }`}>
                <Flame className="w-3 h-3" />
                {p.spiceLevel}
              </span>
            </div>

            {/* SKU Matrix Table */}
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className="text-[11px] font-extrabold text-gray-600 uppercase mb-2 flex justify-between">
                <span>Pack Size</span>
                <span>Retail MRP</span>
                <span>Wholesale</span>
                <span>In Stock</span>
              </div>
              <div className="space-y-1.5">
                {p.skus.map((sku, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-semibold border-t border-gray-200/50 pt-1.5 first:border-0 first:pt-0">
                    <span className="font-bold text-gray-900">{sku.size}</span>
                    <span className="text-gray-800">₹{sku.mrp}</span>
                    <span className="text-emerald-700 font-extrabold">₹{sku.wholesaleRate}</span>
                    <span className="text-[11px] text-gray-500 font-bold bg-white px-2 py-0.5 rounded-md border border-gray-200">
                      {sku.inStockUnits} pkts
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center text-[11px] text-gray-500 pt-1 border-t border-gray-100">
              <span>Shelf Life: <span className="font-bold text-gray-700">{p.shelfLife}</span></span>
              <span>FSSAI: <span className="font-bold text-gray-700">10020047000123</span></span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: New Product */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 animate-in fade-in">
            <h3 className="font-extrabold text-base text-gray-900">Add New Podi Variety</h3>
            <form onSubmit={handleAddProduct} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Variety Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kakarakaya (Bittergourd) Podi"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Spice Intensity</label>
                <select
                  value={newSpice}
                  onChange={(e) => setNewSpice(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                >
                  <option value="Mild">Mild</option>
                  <option value="Medium">Medium Traditional</option>
                  <option value="Fiery Hot">Fiery Hot</option>
                  <option value="Extra Guntur Spice">Extra Guntur Spice</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">100g Retail MRP (₹)</label>
                <input
                  type="number"
                  value={new100gRate}
                  onChange={(e) => setNew100gRate(Number(e.target.value))}
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
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
