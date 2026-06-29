'use client';

import { useState, useEffect } from 'react';
import { Save, UploadCloud, Loader2 } from 'lucide-react';

type AboutData = {
  id: string;
  authorName: string;
  subtitle: string;
  profileImage: string;
  biographyTitle: string;
  biographyDesc: string;
  earlyLifeTitle: string;
  earlyLifeDesc: string;
  educationTitle: string;
  educationDesc: string;
  careerTitle: string;
  careerDesc: string;
  awardsTitle: string;
  awardsDesc: string;
  legacyTitle: string;
  legacyDesc: string;
  dob: string;
  pob: string;
  occupation: string;
  language: string;
  almaMater: string;
  awardsList: string;
};

export default function AboutManager() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch('/api/about')
      .then(res => res.json())
      .then(json => {
        if (json.success) setData(json.about);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    
    try {
      const res = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) alert('Saved successfully!');
      else alert('Failed to save');
    } catch (err) {
      console.error(err);
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !data) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        setData({ ...data, profileImage: json.url });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => prev ? { ...prev, [name]: value } : null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">About Page Management</h2>
          <p className="text-slate-400 text-sm">Edit the content and timeline details.</p>
        </div>
        <button 
          onClick={() => document.getElementById('about-form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-pink-900/20 transition-all font-medium disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <form id="about-form" onSubmit={handleSave} className="space-y-6">
        
        {/* Author Information */}
        <div className="bg-[#0f172a] rounded-xl border border-slate-800 overflow-hidden">
          <div className="p-5 border-b border-slate-800 bg-[#151f38]">
            <h3 className="text-white font-medium">Author Information</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Author Name</label>
                <input name="authorName" value={data.authorName || ''} onChange={handleChange} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Subtitle</label>
                <input name="subtitle" value={data.subtitle || ''} onChange={handleChange} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500 transition-colors" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Profile Image</label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-700 bg-[#1e293b] px-6 py-6 hover:bg-slate-800 transition-colors">
                <div className="text-center">
                  {data.profileImage ? (
                    <div className="relative inline-block">
                      <img src={data.profileImage} alt="Profile" className="h-32 rounded-md object-cover" />
                      <button type="button" onClick={() => setData({...data, profileImage: ''})} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center">×</button>
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
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-[#0f172a] rounded-xl border border-slate-800 overflow-hidden">
          <div className="p-5 border-b border-slate-800 bg-[#151f38]">
            <h3 className="text-white font-medium">Content Sections</h3>
          </div>
          <div className="p-6 space-y-6">
            
            {['biography', 'earlyLife', 'education', 'career', 'awards', 'legacy'].map((section) => (
              <div key={section} className="p-4 border border-slate-800 rounded-lg bg-[#1e293b] space-y-4">
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-slate-400 mb-1 capitalize">{section} Title</label>
                    <input 
                      name={`${section}Title`} 
                      value={data[`${section}Title` as keyof AboutData] || ''} 
                      onChange={handleChange} 
                      className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1 capitalize">{section} Description</label>
                  <textarea 
                    name={`${section}Desc`} 
                    value={data[`${section}Desc` as keyof AboutData] || ''} 
                    onChange={handleChange} 
                    rows={4}
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500" 
                  />
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Personal Information Panel */}
        <div className="bg-[#0f172a] rounded-xl border border-slate-800 overflow-hidden">
          <div className="p-5 border-b border-slate-800 bg-[#151f38]">
            <h3 className="text-white font-medium">Personal Information (Sidebar Panel)</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['dob', 'pob', 'occupation', 'language', 'almaMater', 'awardsList'].map((field) => (
              <div key={field}>
                <label className="block text-xs font-medium text-slate-400 mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                <input 
                  name={field} 
                  value={data[field as keyof AboutData] || ''} 
                  onChange={handleChange} 
                  className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500" 
                />
              </div>
            ))}
          </div>
        </div>

      </form>
    </div>
  );
}
