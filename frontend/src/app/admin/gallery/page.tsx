'use client';

import { useState } from 'react';
import { Plus, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function GalleryManager() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Gallery</h2>
          <p className="text-zinc-500 mt-1">Manage your historical and personal photos.</p>
        </div>
        <button 
          className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Upload Image
        </button>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden p-12 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
          <ImageIcon className="w-8 h-8 text-zinc-400" />
        </div>
        <h3 className="text-lg font-medium text-zinc-900">Gallery Under Construction</h3>
        <p className="text-zinc-500 mt-1 mb-6">The gallery management interface is being built right now.</p>
      </div>
    </div>
  );
}
