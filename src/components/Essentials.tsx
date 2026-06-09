import React, { useState } from 'react';
import { CheckSquare, Square, ShoppingCart } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SHOPPING_BASE, SHOPPING_WEEKLY } from '../data';

export default function Essentials() {
  const [supplies, setSupplies] = useLocalStorage<string[]>('corp_vitalSupplies', []);
  const [activeSubTab, setActiveSubTab] = useState<'base' | 'weekly'>('base');

  const handleToggle = (item: string) => {
    setSupplies(prev => {
      if (prev.includes(item)) return prev.filter(i => i !== item);
      return [...prev, item];
    });
  };

  const currentList = activeSubTab === 'base' ? SHOPPING_BASE : SHOPPING_WEEKLY;
  const collectedCount = currentList.filter(item => supplies.includes(item.name)).length;
  const totalCount = currentList.length;
  const percentage = Math.round((collectedCount / totalCount) * 100) || 0;

  // Group items by category
  const groupedItems = currentList.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof currentList>);

  return (
    <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg shadow-slate-900/50">
        <div className="flex items-center gap-2 text-[10px] text-slate-400 tracking-wider uppercase font-medium mb-2">
          <ShoppingCart className="w-3.5 h-3.5 text-emerald-500" /> Spiżarnia Wellness
        </div>
        <div className="flex items-end justify-between mb-4">
          <div className="text-lg font-semibold text-white">Skompletowano {collectedCount}/{totalCount}</div>
          <div className="text-3xl font-bold text-emerald-500">{percentage}<span className="text-lg">%</span></div>
        </div>
        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-700/50">
          <div className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-slate-800 border border-slate-700 rounded-xl">
        <button 
          onClick={() => setActiveSubTab('base')}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${activeSubTab === 'base' ? 'bg-emerald-500 text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
        >
          Miesięczna Baza
        </button>
        <button 
          onClick={() => setActiveSubTab('weekly')}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${activeSubTab === 'weekly' ? 'bg-emerald-500 text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
        >
          Tygodniowe Uzupełnienie
        </button>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedItems).map(([categoryName, items]) => (
          <div key={categoryName} className="space-y-3">
            <h3 className="text-xs font-semibold tracking-widest text-slate-400 uppercase pl-1 mb-2">
              {categoryName}
            </h3>
            <div className="space-y-3">
              {items.map(product => {
                const isChecked = supplies.includes(product.name);
                const Icon = product.icon;
                return (
                  <div 
                    key={product.name} 
                    onClick={() => handleToggle(product.name)}
                    className={`flex items-center gap-4 border p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                      isChecked ? 'bg-slate-800 border-slate-700' : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center transition-colors ${
                      isChecked ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-700/50 text-slate-400'
                    }`}>
                      <Icon className="w-[20px] h-[20px]" />
                    </div>
                    <div className={`flex-1 text-sm font-medium transition-all ${isChecked ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                      {product.name}
                    </div>
                    {isChecked ? (
                      <CheckSquare className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <Square className="w-6 h-6 text-slate-600" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
