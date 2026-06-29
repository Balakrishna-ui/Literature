'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AddBook() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [coverUrl, setCoverUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setCoverUrl(data.url);
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title'),
      category: formData.get('category'),
      shortDescription: formData.get('shortDescription'),
      fullDescription: formData.get('fullDescription'),
      coverImage: coverUrl,
      publishedYear: formData.get('publishedYear'),
      publisher: formData.get('publisher'),
      pages: formData.get('pages'),
      buyLink: formData.get('buyLink'),
      isFeatured: formData.get('isFeatured') === 'on',
      displayOrder: formData.get('displayOrder')
    };

    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        router.push('/admin/books');
        router.refresh();
      } else {
        alert('Failed to save book');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/books" className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-zinc-500" />
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Add New Book</h2>
          <p className="text-zinc-500 mt-1">Publish a new literary work to your website.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-zinc-200 shadow-sm p-6 space-y-8">
        
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-900">Book Title *</label>
            <input required name="title" type="text" className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black" placeholder="e.g. Aaru Velu" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-900">Category *</label>
            <select name="category" className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
              <option value="NOVEL">Novel</option>
              <option value="POETRY_COLLECTION">Poetry Collection</option>
              <option value="STAGE_PLAY">Stage Play</option>
              <option value="SHORT_STORIES">Short Stories</option>
            </select>
          </div>
        </div>

        {/* Descriptions */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-900">Short Description</label>
          <input name="shortDescription" type="text" className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black" placeholder="A brief 1-2 sentence overview" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-900">Full Description</label>
          <textarea name="fullDescription" rows={4} className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black" placeholder="Detailed synopsis..."></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-900">Publication Year</label>
            <input name="publishedYear" type="text" className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black" placeholder="e.g. 1978" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-900">Publisher</label>
            <input name="publisher" type="text" className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black" placeholder="e.g. Visalandhra" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-900">Number of Pages</label>
            <input name="pages" type="number" className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black" placeholder="e.g. 320" />
          </div>
        </div>

        {/* Cover Image */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-900">Cover Image</label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-zinc-300 px-6 py-10 hover:bg-zinc-50 transition-colors">
            <div className="text-center">
              {coverUrl ? (
                <div className="relative inline-block">
                  <img src={coverUrl} alt="Cover preview" className="h-48 rounded-md shadow-md object-contain" />
                  <button type="button" onClick={() => setCoverUrl('')} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs">X</button>
                </div>
              ) : (
                <>
                  <UploadCloud className="mx-auto h-12 w-12 text-zinc-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-zinc-600 justify-center">
                    <label className="relative cursor-pointer rounded-md bg-white font-semibold text-black hover:text-zinc-700">
                      <span>{uploading ? 'Uploading...' : 'Upload a file'}</span>
                      <input type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-zinc-500">PNG, JPG up to 10MB</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Links & Visibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-100">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-900">Buy Link (Amazon / Store)</label>
            <input name="buyLink" type="url" className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black" placeholder="https://" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-900">Display Order</label>
            <input name="displayOrder" type="number" defaultValue="0" className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="isFeatured" id="isFeatured" className="w-4 h-4 rounded border-zinc-300 text-black focus:ring-black" />
          <label htmlFor="isFeatured" className="text-sm font-medium text-zinc-900">Featured Book (Shows prominently on home page)</label>
        </div>

        <div className="pt-6 flex justify-end gap-4 border-t border-zinc-100">
          <Link href="/admin/books" className="px-4 py-2 text-zinc-600 hover:text-zinc-900 font-medium">
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={loading}
            className="inline-flex items-center justify-center bg-black text-white px-6 py-2 rounded-md hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Publish Book
          </button>
        </div>
      </form>
    </div>
  );
}
