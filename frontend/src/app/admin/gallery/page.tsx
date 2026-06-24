'use client';

import { useState, useEffect } from 'react';
import { apiRequest, apiUpload } from '@/lib/api';

interface Category {
  id: number;
  name: string;
}

interface GalleryImage {
  id: number;
  imagePath: string;
  title?: string;
  description?: string;
  categoryId: number;
  featured: boolean;
  createdAt: string;
  category: Category;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const PRESET_CATEGORIES = [
  'Personal Photos', 'Literary Events', 'Award Ceremonies',
  'Book Launches', 'Natakalu Images', 'Historical Moments'
];

export default function GalleryAdminPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState<number | 'all'>('all');
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploadCatId, setUploadCatId] = useState<number | ''>('');
  const [uploadTitle, setUploadTitle] = useState('');
  const [editImage, setEditImage] = useState<GalleryImage | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const fetchData = async () => {
    try {
      const [imgs, cats] = await Promise.all([
        apiRequest('/api/gallery/images'),
        apiRequest('/api/gallery/categories'),
      ]);
      setImages(imgs);
      setCategories(cats);
      if (cats.length > 0 && uploadCatId === '') setUploadCatId(cats[0].id);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Auto-create preset categories if none exist
  const ensureCategories = async () => {
    if (categories.length === 0) {
      await Promise.all(PRESET_CATEGORIES.map((name) => apiRequest('/api/gallery/categories', { method: 'POST', body: JSON.stringify({ name }) })));
      await fetchData();
    }
  };

  const handleUpload = async () => {
    if (!files || files.length === 0 || !uploadCatId) return;
    setUploading(true);
    try {
      if (files.length === 1) {
        const fd = new FormData();
        fd.append('image', files[0]);
        fd.append('categoryId', String(uploadCatId));
        fd.append('title', uploadTitle);
        await apiUpload('/api/gallery/images', fd);
      } else {
        const fd = new FormData();
        Array.from(files).forEach((f) => fd.append('images', f));
        fd.append('categoryId', String(uploadCatId));
        await apiUpload('/api/gallery/images/bulk', fd);
      }
      setFiles(null);
      setUploadTitle('');
      setShowUpload(false);
      fetchData();
    } catch {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this image?')) return;
    await apiRequest(`/api/gallery/images/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleUpdateImage = async () => {
    if (!editImage) return;
    await apiRequest(`/api/gallery/images/${editImage.id}`, {
      method: 'PUT',
      body: JSON.stringify({ title: editImage.title, description: editImage.description, categoryId: editImage.categoryId, featured: editImage.featured }),
    });
    setEditImage(null);
    fetchData();
  };

  const filtered = selectedCat === 'all' ? images : images.filter((i) => i.categoryId === selectedCat);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Gallery Management</h1>
          <p className="text-slate-400 mt-1">Upload and organize your photos</p>
        </div>
        <div className="flex gap-3">
          {categories.length === 0 && (
            <button onClick={ensureCategories} className="px-4 py-2 rounded-xl border border-purple-500/40 text-purple-400 text-sm hover:bg-purple-500/10 transition">
              Setup Categories
            </button>
          )}
          <button onClick={() => setShowUpload(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:opacity-90 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
            Upload Images
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedCat('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition ${selectedCat === 'all' ? 'bg-purple-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'}`}
        >
          All ({images.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${selectedCat === cat.id ? 'bg-purple-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'}`}
          >
            {cat.name} ({images.filter((i) => i.categoryId === cat.id).length})
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/10 rounded-2xl">
          <svg className="w-12 h-12 text-slate-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          <p className="text-slate-400">No images yet. Upload some!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((img) => (
            <div key={img.id} className="group relative bg-slate-800 rounded-xl overflow-hidden aspect-square">
              <img
                src={`${API_BASE}${img.imagePath}`}
                alt={img.title || 'Gallery image'}
                className="w-full h-full object-cover"
              />
              {img.featured && (
                <div className="absolute top-2 left-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-xs">★</div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2">
                {img.title && <p className="text-white text-xs font-medium px-2 text-center">{img.title}</p>}
                <p className="text-slate-300 text-xs">{img.category.name}</p>
                <div className="flex gap-2 mt-1">
                  <button onClick={() => setEditImage(img)} className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-white/30 transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  </button>
                  <button onClick={() => handleDelete(img.id)} className="p-1.5 rounded-lg bg-red-500/30 text-red-300 hover:bg-red-500/50 transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-white font-semibold">Upload Images</h2>
              <button onClick={() => setShowUpload(false)} className="text-slate-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-slate-400 text-xs mb-1">Category</label>
                <select value={uploadCatId} onChange={(e) => setUploadCatId(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="" disabled className="bg-slate-900 text-white">Select a category...</option>
                  {categories.map((c) => <option key={c.id} value={c.id} className="bg-slate-900 text-white">{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-400 text-xs mb-1">Title (optional, for single upload)</label>
                <input type="text" value={uploadTitle} onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Image title..."/>
              </div>
              <div>
                <label className="block text-slate-400 text-xs mb-2">Select Images (JPG, PNG, WEBP — max 5MB each)</label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-purple-500/50 hover:bg-purple-500/5 transition">
                  <svg className="w-8 h-8 text-slate-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                  <span className="text-slate-400 text-sm">{files ? `${files.length} file(s) selected` : 'Click to choose files'}</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => setFiles(e.target.files)}/>
                </label>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-white/10">
              <button onClick={() => setShowUpload(false)} className="flex-1 py-2 rounded-xl border border-white/10 text-slate-400 hover:text-white transition text-sm">Cancel</button>
              <button onClick={handleUpload} disabled={uploading || !files}
                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-60">
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Image Modal */}
      {editImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-white font-semibold">Edit Image</h2>
              <button onClick={() => setEditImage(null)} className="text-slate-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <img src={`${API_BASE}${editImage.imagePath}`} className="w-full h-40 object-cover rounded-xl" alt="preview"/>
              <div>
                <label className="block text-slate-400 text-xs mb-1">Title</label>
                <input type="text" value={editImage.title || ''} onChange={(e) => setEditImage({...editImage, title: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"/>
              </div>
              <div>
                <label className="block text-slate-400 text-xs mb-1">Description</label>
                <textarea value={editImage.description || ''} onChange={(e) => setEditImage({...editImage, description: e.target.value})} rows={2}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"/>
              </div>
              <div>
                <label className="block text-slate-400 text-xs mb-1">Category</label>
                <select value={editImage.categoryId} onChange={(e) => setEditImage({...editImage, categoryId: Number(e.target.value)})}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="" disabled className="bg-slate-900 text-white">Select a category...</option>
                  {categories.map((c) => <option key={c.id} value={c.id} className="bg-slate-900 text-white">{c.name}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="featuredImg" checked={editImage.featured} onChange={(e) => setEditImage({...editImage, featured: e.target.checked})}
                  className="w-4 h-4 accent-purple-500"/>
                <label htmlFor="featuredImg" className="text-slate-400 text-sm">Featured Image</label>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-white/10">
              <button onClick={() => setEditImage(null)} className="flex-1 py-2 rounded-xl border border-white/10 text-slate-400 hover:text-white transition text-sm">Cancel</button>
              <button onClick={handleUpdateImage} className="flex-1 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:opacity-90 transition">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
