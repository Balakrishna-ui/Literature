'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Loader2, UploadCloud, ImageIcon } from 'lucide-react';

type Category = { id: string; name: string };
type GalleryImage = {
  id: string;
  url: string;
  title: string;
  description: string;
  categoryId: string;
  isFeatured: boolean;
  category: Category;
};

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('All Photos');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    id: '',
    url: '',
    title: '',
    description: '',
    categoryId: '',
    isFeatured: false,
    displayOrder: 0
  });

  const fetchData = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.success) {
        // Sort categories to match the requested order, or just use them as returned
        setCategories(data.categories);
        setImages(data.images);
        if (data.categories.length > 0) {
          const defaultCat = ['Personal Photos', 'Literary Events', 'Award Ceremonies', 'Book Launches', 'Natakalu Images', 'Historical Moments']
            .map(name => data.categories.find((c: any) => c.name === name))
            .filter(c => c)[0];
          setFormData(prev => ({ ...prev, categoryId: defaultCat?.id || data.categories[0].id }));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    setUploading(true);
    const fileData = new FormData();
    fileData.append('file', e.target.files[0]);

    try {
      const res = await fetch('/api/media', { method: 'POST', body: fileData });
      const json = await res.json();
      if (json.success) {
        setFormData(prev => ({ ...prev, url: json.url }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url) return alert('Please upload an image first');
    
    setSaving(true);
    const isEditing = !!formData.id;
    const method = isEditing ? 'PUT' : 'POST';
    
    try {
      const res = await fetch('/api/gallery', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchData();
        resetForm();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) setImages(images.filter(img => img.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const openEdit = (img: GalleryImage) => {
    setFormData({
      id: img.id,
      url: img.url,
      title: img.title || '',
      description: img.description || '',
      categoryId: img.categoryId,
      isFeatured: img.isFeatured,
      displayOrder: 0
    });
    setIsModalOpen(true);
  };

  const displayCategories = ['All Photos', 'Personal Photos', 'Literary Events', 'Award Ceremonies', 'Book Launches', 'Natakalu Images', 'Historical Moments'];

  const sortedCategories = displayCategories
    .filter(name => name !== 'All Photos')
    .map(name => categories.find(c => c.name === name))
    .filter(c => c);

  const resetForm = () => {
    setFormData({
      id: '',
      url: '',
      title: '',
      description: '',
      categoryId: sortedCategories[0]?.id || '',
      isFeatured: false,
      displayOrder: 0
    });
  };

  const filteredImages = activeTab === 'All Photos' 
    ? images 
    : images.filter(img => img.category.name === activeTab);


  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Gallery Management</h2>
          <p className="text-slate-400 text-sm">Manage your historical and personal photos.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-pink-900/20 transition-all font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Image
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-pink-500" /></div>
      ) : (
        <div className="space-y-6">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {displayCategories.map(cat => {
              // Only show the tab if the category actually exists in the DB (or if it's 'All Photos')
              // This handles the case where DB categories might differ slightly.
              const exists = cat === 'All Photos' || categories.some(c => c.name === cat);
              if (!exists) return null;
              
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-2 text-sm font-medium border transition-colors ${
                    isActive 
                      ? 'bg-[#a32a2a] text-white border-[#a32a2a]' 
                      : 'bg-white text-[#1e3a5f] border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredImages.map(img => (
              <div key={img.id} className="group relative bg-[#1e293b] rounded-lg border border-slate-800 overflow-hidden flex flex-col hover:border-slate-600 transition-colors">
                <div className="aspect-square bg-slate-900 relative flex items-center justify-center p-2">
                  <img src={img.url} alt={img.title} className="max-w-full max-h-full object-contain" />
                  
                  <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                    <button onClick={() => openEdit(img)} className="p-2 bg-slate-800 text-slate-200 rounded hover:bg-slate-700 hover:text-white transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(img.id)} className="p-2 bg-slate-800 text-red-400 rounded hover:bg-red-900/50 hover:text-red-300 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {img.isFeatured && (
                    <div className="absolute top-2 right-2 bg-pink-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-md">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-slate-800 bg-[#0f172a]">
                  <p className="text-xs text-slate-300 truncate font-medium mb-1" title={img.title || 'Untitled'}>
                    {img.title || 'Untitled'}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {img.category?.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {filteredImages.length === 0 && (
            <div className="text-center py-24 text-slate-500 bg-[#0f172a] rounded-xl border border-slate-800">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 text-slate-700" />
              <p>No images found in this category.</p>
            </div>
          )}
        </div>
      )}

      {/* Upload/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-800 bg-[#151f38] flex justify-between items-center">
              <h3 className="text-white font-medium">{formData.id ? 'Edit Image' : 'Add Image'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              
              <div className="flex justify-center rounded-lg border border-dashed border-slate-700 bg-[#1e293b] px-6 py-6 hover:bg-slate-800 transition-colors">
                <div className="text-center">
                  {formData.url ? (
                    <div className="relative inline-block">
                      <img src={formData.url} alt="Preview" className="h-40 rounded-md object-contain" />
                      <button type="button" onClick={() => setFormData({...formData, url: ''})} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center">✕</button>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="mx-auto h-8 w-8 text-slate-500" />
                      <div className="mt-2 flex text-sm text-slate-400 justify-center">
                        <label className="relative cursor-pointer text-pink-500 font-medium hover:text-pink-400">
                          <span>{uploading ? 'Uploading...' : 'Upload an image'}</span>
                          <input type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                        </label>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Category *</label>
                <select required value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500">
                  {displayCategories
                    .filter(name => name !== 'All Photos')
                    .map(name => categories.find(c => c.name === name))
                    .filter(c => c)
                    .map(c => <option key={c!.id} value={c!.id}>{c!.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Title</label>
                <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500" />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
                <textarea rows={2} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500" />
              </div>
              
              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="isFeatured" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} className="w-4 h-4 rounded border-slate-700 bg-[#1e293b] text-pink-500 focus:ring-pink-500" />
                <label htmlFor="isFeatured" className="text-sm font-medium text-slate-300">Mark as Featured Image</label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white font-medium text-sm">Cancel</button>
                <button type="submit" disabled={saving} className="inline-flex items-center justify-center bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 text-sm font-medium">
                  {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Save Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
