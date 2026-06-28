'use client';

import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api';

interface MediaFile {
  filename: string;
  url: string;
  size: number;
  createdAt: string;
}

const API_BASE = '';

export default function MediaLibraryPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<MediaFile | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const fetchFiles = async () => {
    try {
      const data = await apiRequest('/api/media');
      setFiles(data);
    } catch {
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFiles(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;
    setUploading(true);
    try {
      const token = localStorage.getItem('admin_token');
      await Promise.all(
        Array.from(selectedFiles).map((file) => {
          const fd = new FormData();
          fd.append('file', file);
          return fetch(`${API_BASE}/api/media`, {
            method: 'POST',
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            body: fd,
          });
        })
      );
      fetchFiles();
    } catch {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm('Delete this file permanently?')) return;
    await apiRequest(`/api/media/${filename}`, { method: 'DELETE' });
    fetchFiles();
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(`${API_BASE}${url}`);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const filtered = files.filter((f) => f.filename.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Media Library</h1>
          <p className="text-slate-400 mt-1">{files.length} files stored</p>
        </div>
        <label className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold cursor-pointer hover:opacity-90 transition ${uploading ? 'opacity-60 cursor-not-allowed' : ''}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
          {uploading ? 'Uploading...' : 'Upload Files'}
          <input type="file" accept=".jpg,.jpeg,.png,.webp" multiple className="hidden" onChange={handleUpload} disabled={uploading}/>
        </label>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search files..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-xs px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
      />

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/10 rounded-2xl">
          <svg className="w-12 h-12 text-slate-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"/></svg>
          <p className="text-slate-400">No files yet. Upload some images!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map((file) => (
            <div key={file.filename} className="group relative bg-slate-800 rounded-xl overflow-hidden aspect-square border border-white/5 hover:border-purple-500/30 transition cursor-pointer" onClick={() => setPreview(file)}>
              <img
                src={`${API_BASE}${file.url}`}
                alt={file.filename}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2 p-2">
                <p className="text-white text-xs text-center break-all leading-tight">{file.filename}</p>
                <p className="text-slate-400 text-xs">{formatSize(file.size)}</p>
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); copyUrl(file.url); }}
                    className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-white/30 transition"
                    title="Copy URL"
                  >
                    {copiedUrl === file.url ? (
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    )}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(file.filename); }}
                    className="p-1.5 rounded-lg bg-red-500/30 text-red-300 hover:bg-red-500/50 transition"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setPreview(null)}>
          <div className="max-w-2xl w-full bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img src={`${API_BASE}${preview.url}`} alt={preview.filename} className="w-full max-h-96 object-contain bg-slate-950"/>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">{preview.filename}</p>
                <p className="text-slate-400 text-xs mt-1">{formatSize(preview.size)}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => copyUrl(preview.url)} className="px-3 py-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white text-xs transition">
                  {copiedUrl === preview.url ? 'Copied!' : 'Copy URL'}
                </button>
                <button onClick={() => { handleDelete(preview.filename); setPreview(null); }} className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs transition">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

