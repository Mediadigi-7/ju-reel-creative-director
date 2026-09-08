import React from 'react';
import { Eye, Camera, UserCheck, Mic, Scissors, Users, MapPin, Package } from 'lucide-react';
import { ProductionNotes } from '../../shared/types.js';

interface ProductionNotesCardProps {
  notes: ProductionNotes;
}

export const ProductionNotesCard: React.FC<ProductionNotesCardProps> = ({ notes }) => {
  return (
    <div className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8 mb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-100">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-0.5">
            Technical Brief
          </span>
          <h2 className="text-base font-bold text-stone-900 tracking-tight">
            Production & Shooting Notes
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
            Complexity
          </span>
          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-800 border border-stone-200">
            {notes.complexity}
          </span>
        </div>
      </div>

      {/* Structured Technical Spec Grid — consistent category icons for rapid scanning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 text-xs">
        {/* Visual Style — Eye */}
        <div>
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
            <Eye className="w-3 h-3 text-stone-400 flex-shrink-0" />
            <span>Visual Style & Atmosphere</span>
          </span>
          <p className="text-stone-700 leading-relaxed font-normal">
            {notes.visualStyle}
          </p>
        </div>

        {/* Camera & Lighting — Camera */}
        <div>
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
            <Camera className="w-3 h-3 text-stone-400 flex-shrink-0" />
            <span>Camera & Lighting</span>
          </span>
          <p className="text-stone-700 leading-relaxed font-normal">
            {notes.camera}
          </p>
        </div>

        {/* Performance & Acting — UserCheck */}
        <div>
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
            <UserCheck className="w-3 h-3 text-stone-400 flex-shrink-0" />
            <span>Performance Direction</span>
          </span>
          <p className="text-stone-700 leading-relaxed font-normal">
            {notes.performance}
          </p>
        </div>

        {/* Sound & Music — Mic */}
        <div>
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
            <Mic className="w-3 h-3 text-stone-400 flex-shrink-0" />
            <span>Sound Design & Audio</span>
          </span>
          <p className="text-stone-700 leading-relaxed font-normal">
            {notes.sound}
          </p>
        </div>

        {/* Editing Rhythm — Scissors */}
        <div>
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
            <Scissors className="w-3 h-3 text-stone-400 flex-shrink-0" />
            <span>Editing Rhythm</span>
          </span>
          <p className="text-stone-700 leading-relaxed font-normal">
            {notes.editing}
          </p>
        </div>

        {/* Casting — Users */}
        <div>
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
            <Users className="w-3 h-3 text-stone-400 flex-shrink-0" />
            <span>Casting & Talent</span>
          </span>
          <p className="text-stone-700 leading-relaxed font-normal">
            {notes.casting}
          </p>
        </div>

        {/* Locations & Props Row */}
        <div className="md:col-span-2 pt-3 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
              <MapPin className="w-3 h-3 text-stone-400 flex-shrink-0" />
              <span>Campus Locations</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {notes.locations.map((loc, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200"
                >
                  {loc}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
              <Package className="w-3 h-3 text-stone-400 flex-shrink-0" />
              <span>Required Props</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {notes.props.map((prop, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200"
                >
                  {prop}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
