'use client';

import { Settings, FileText } from 'lucide-react';

export default function AboutManager() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">About Page Management</h2>
          <p className="text-zinc-500 mt-1">Edit the content, timeline, and education details.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden p-12 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-zinc-400" />
        </div>
        <h3 className="text-lg font-medium text-zinc-900">About Editor Under Construction</h3>
        <p className="text-zinc-500 mt-1 mb-6">The About Page editor interface is being built right now.</p>
      </div>
    </div>
  );
}
