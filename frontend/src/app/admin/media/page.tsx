'use client';

import { useState, useEffect, useRef } from 'react';
import { UploadCloud, Search, Trash2, Link as LinkIcon, Image as ImageIcon, Loader2 } from 'lucide-react';

type MediaFile = {
  name: string;
  url: string;
  size: number;
  createdAt: string;
};

export default function MediaManager() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = async () => {
    try {
      const res = await fetch('/api/media');
      const data = await res.json();
      if (data.success) {
        setFiles(data.files);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setUploading(true);
    
    // Upload files one by one
    for (let i = 0; i < e.target.files.length; i++) {
      const formData = new FormData();
      formData.append('file', e.target.files[i]);
      
      try {
        await fetch('/api/media', { method: 'POST', body: formData });
      } catch (err) {
        console.error('Failed to upload', err);
      }
    }
    
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    fetchFiles();
  };

  const handleDelete = async (filename: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      const res = await fetch(`/api/media?filename=${encodeURIComponent(filename)}`, { method: 'DELETE' });
      if (res.ok) {
        setFiles(files.filter(f => f.name !== filename));
      }
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Media Library</h2>
          <p className="text-slate-400 text-sm">Upload and manage all your images here.</p>
        </div>
        <div>
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            multiple 
            accept="image/*"
            onChange={handleUpload}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 py-2.5 rounded-lg hover:shadow-lg hover:shadow-pink-900/20 transition-all font-medium disabled:opacity-50"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
            {uploading ? 'Uploading...' : 'Upload Images'}
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4 bg-[#0f172a] p-4 rounded-xl border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#1e293b] border border-slate-700 rounded-lg focus:outline-none focus:border-pink-500 text-slate-200 placeholder-slate-500 transition-colors text-sm"
          />
        </div>
        <div className="text-slate-400 text-sm ml-auto">
          {filteredFiles.length} item{filteredFiles.length !== 1 && 's'}
        </div>
      </div>

      {/* Grid */}
      <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-6 min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-pink-500" />
            <p>Loading media...</p>
          </div>
        ) : files.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500 text-center">
            <div className="w-16 h-16 rounded-full bg-[#1e293b] flex items-center justify-center mb-4 border border-slate-700">
              <ImageIcon className="w-8 h-8 text-slate-600" />
            </div>
            <p className="text-slate-300 font-medium mb-1">No media found</p>
            <p className="text-sm max-w-sm">Upload images to use them in your books, gallery, and about page.</p>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="text-center py-12 text-slate-500">No files match your search.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredFiles.map((file) => (
              <div key={file.name} className="group relative bg-[#1e293b] rounded-lg border border-slate-800 overflow-hidden flex flex-col hover:border-slate-600 transition-colors">
                <div className="aspect-square bg-slate-900 relative flex items-center justify-center p-2">
                  {/* Image Preview */}
                  {file.name.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                    <img src={file.url} alt={file.name} className="max-w-full max-h-full object-contain" />
                  ) : (
                    <ImageIcon className="w-10 h-10 text-slate-600" />
                  )}
                  
                  {/* Hover Overlay Actions */}
                  <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                    <button 
                      title="Copy URL"
                      onClick={() => { navigator.clipboard.writeText(file.url); alert('URL copied to clipboard!'); }}
                      className="p-2 bg-slate-800 text-slate-200 rounded hover:bg-slate-700 hover:text-white transition-colors"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </button>
                    <button 
                      title="Delete"
                      onClick={() => handleDelete(file.name)}
                      className="p-2 bg-slate-800 text-red-400 rounded hover:bg-red-900/50 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-3 border-t border-slate-800 bg-[#0f172a]">
                  <p className="text-xs text-slate-300 truncate font-medium mb-1" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-[10px] text-slate-500 flex justify-between">
                    <span>{formatSize(file.size)}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
