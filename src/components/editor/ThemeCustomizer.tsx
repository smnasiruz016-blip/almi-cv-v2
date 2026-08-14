'use client';

import React from 'react';

export interface ThemeConfig {
  primary: string;
  secondary: string;
  background: string;
  textColor: string;
  fontFamily: 'font-sans' | 'font-serif' | 'font-mono' | 'font-playfair' | 'font-outfit';
  fontSizeScale: 'scale-sm' | 'scale-base' | 'scale-lg';
  showDecorations?: boolean;
}

interface ThemeCustomizerProps {
  theme: ThemeConfig;
  onChange: (updatedTheme: Partial<ThemeConfig>) => void;
}

const PRESET_PALETTES = [
  { name: 'Midnight Cyan', primary: '#06b6d4', secondary: '#0f172a', bg: '#090d16', text: '#f8fafc' },
  { name: 'Corporate Navy', primary: '#1e3a8a', secondary: '#3b82f6', bg: '#ffffff', text: '#0f172a' },
  { name: 'Teacher Sunshine', primary: '#f59e0b', secondary: '#fbbf24', bg: '#fefce8', text: '#1e293b' },
  { name: 'Emerald Executive', primary: '#047857', secondary: '#10b981', bg: '#f0fdf4', text: '#064e3b' },
  { name: 'Rose Editorial', primary: '#e11d48', secondary: '#fda4af', bg: '#fff1f2', text: '#4c0519' },
  { name: 'DevOps Terminal', primary: '#10b981', secondary: '#6366f1', bg: '#0f172a', text: '#e2e8f0' },
];

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ theme, onChange }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-4 space-y-4">
      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Styling & Typography</h3>
      </div>

      {/* Preset Swatches */}
      <div>
        <label className="text-[11px] font-medium text-slate-500 block mb-1.5">Preset Palettes</label>
        <div className="grid grid-cols-6 gap-1.5">
          {PRESET_PALETTES.map((preset) => (
            <button
              key={preset.name}
              type="button"
              title={preset.name}
              onClick={() => onChange({
                primary: preset.primary,
                secondary: preset.secondary,
                background: preset.bg,
                textColor: preset.text
              })}
              className="h-6 w-6 rounded-full border border-slate-300 relative overflow-hidden transition-transform hover:scale-110"
              style={{ background: `linear-gradient(135deg, ${preset.primary} 50%, ${preset.bg} 50%)` }}
            />
          ))}
        </div>
      </div>

      {/* Custom Color Pickers */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] font-medium text-slate-500 block mb-1">Primary Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={theme?.primary || '#1e3a8a'}
              onChange={(e) => onChange({ primary: e.target.value })}
              className="w-7 h-7 rounded border border-slate-200 cursor-pointer p-0.5"
            />
            <span className="text-xs text-slate-600 uppercase font-mono">{theme?.primary || '#1e3a8a'}</span>
          </div>
        </div>

        <div>
          <label className="text-[11px] font-medium text-slate-500 block mb-1">Background</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={theme?.background || '#ffffff'}
              onChange={(e) => onChange({ background: e.target.value })}
              className="w-7 h-7 rounded border border-slate-200 cursor-pointer p-0.5"
            />
            <span className="text-xs text-slate-600 uppercase font-mono">{theme?.background || '#ffffff'}</span>
          </div>
        </div>
      </div>

      {/* Font & Scaling */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] font-medium text-slate-500 block mb-1">Font Family</label>
          <select
            value={theme?.fontFamily || 'font-sans'}
            onChange={(e) => onChange({ fontFamily: e.target.value as any })}
            className="w-full text-xs p-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700"
          >
            <option value="font-sans">Inter (Modern Sans)</option>
            <option value="font-serif">Merriweather (Executive)</option>
            <option value="font-mono">JetBrains (Tech Mono)</option>
            <option value="font-playfair">Playfair (Editorial)</option>
            <option value="font-outfit">Outfit (Clean)</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] font-medium text-slate-500 block mb-1">Scale / Density</label>
          <select
            value={theme?.fontSizeScale || 'scale-base'}
            onChange={(e) => onChange({ fontSizeScale: e.target.value as any })}
            className="w-full text-xs p-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700"
          >
            <option value="scale-sm">Compact (1-Page Fit)</option>
            <option value="scale-base">Standard</option>
            <option value="scale-lg">Spacious</option>
          </select>
        </div>
      </div>
    </div>
  );
};
