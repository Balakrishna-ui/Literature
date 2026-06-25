'use client';

import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api';

interface Book {
  id: number;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  publicationYear: number;
  publisher: string;
  pages: number;
  coverImage?: string;
  featured: boolean;
  displayOrder: number;
  status: string;
}

const CATEGORIES = ['Novel', 'Poetry Collection', 'Stage Play', 'Short Stories'];
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const emptyBook: Omit<Book, 'id'> = {
  title: '',
  category: 'Novel',
  shortDescription: '',
  fullDescription: '',
  publicationYear: new Date().getFullYear(),
  publisher: '',
  pages: 0,
  coverImage: '',
  featured: false,
  displayOrder: 0,
  status: 'published',
};

export default function BooksAdminPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editBook, setEditBook] = useState<Partial<Book>>(emptyBook);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [saving, setSaving] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const fetchBooks = async () => {
    try {
      const data = await apiRequest('/api/books');
      setBooks(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const filtered = books.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'All' || b.category === filterCat;
    return matchSearch && matchCat;
  });

  const openAdd = () => {
    setEditBook(emptyBook);
    setIsEditing(false);
    setCoverFile(null);
    setShowModal(true);
  };

  const openEdit = (book: Book) => {
    setEditBook(book);
    setIsEditing(true);
    setCoverFile(null);
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let coverImage = editBook.coverImage || '';

      // Upload cover if selected
      if (coverFile) {
        const fd = new FormData();
        fd.append('file', coverFile);
        const token = localStorage.getItem('admin_token');
        const uploadRes = await fetch(`${API_BASE}/api/media`, {
          method: 'POST',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: fd,
        });
        const uploaded = await uploadRes.json();
        coverImage = uploaded.url;
      }

      const payload = { ...editBook, coverImage };

      if (isEditing && editBook.id) {
        await apiRequest(`/api/books/${editBook.id}`, { method: 'PUT', body: JSON.stringify(payload) });
      } else {
        await apiRequest('/api/books', { method: 'POST', body: JSON.stringify(payload) });
      }
      setShowModal(false);
      fetchBooks();
    } catch (e) {
      alert('Error saving book');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this book?')) return;
    await apiRequest(`/api/books/${id}`, { method: 'DELETE' });
    fetchBooks();
  };

  const toggleStatus = async (book: Book) => {
    const newStatus = book.status === 'published' ? 'unpublished' : 'published';
    await apiRequest(`/api/books/${book.id}`, { method: 'PUT', body: JSON.stringify({ ...book, status: newStatus }) });
    fetchBooks();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Books Management</h1>
          <p className="text-slate-400 mt-1">Manage all books and publications</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:opacity-90 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
          Add Book
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
        />
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
        >
          <option className="bg-slate-900 text-white" value="All">All Categories</option>
          {CATEGORIES.map((c) => <option className="bg-slate-900 text-white" key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Books Table */}
      <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400">No books found. Add your first book!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-4 py-3 text-left text-slate-400 font-medium">Book</th>
                  <th className="px-4 py-3 text-left text-slate-400 font-medium">Category</th>
                  <th className="px-4 py-3 text-left text-slate-400 font-medium">Year</th>
                  <th className="px-4 py-3 text-left text-slate-400 font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-slate-400 font-medium">Featured</th>
                  <th className="px-4 py-3 text-left text-slate-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((book) => (
                  <tr key={book.id} className="hover:bg-white/5 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {book.coverImage ? (
                          <img src={`${API_BASE}${book.coverImage}`} className="w-10 h-14 object-cover rounded" alt={book.title}/>
                        ) : (
                          <div className="w-10 h-14 rounded bg-slate-700 flex items-center justify-center">
                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13"/></svg>
                          </div>
                        )}
                        <div>
                          <p className="text-white font-medium">{book.title}</p>
                          <p className="text-slate-500 text-xs">{book.publisher}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{book.category}</td>
                    <td className="px-4 py-3 text-slate-300">{book.publicationYear}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleStatus(book)}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${book.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'}`}>
                        {book.status}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      {book.featured ? <span className="text-yellow-400">★</span> : <span className="text-slate-600">☆</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(book)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        </button>
                        <button onClick={() => handleDelete(book.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-white font-semibold text-lg">{isEditing ? 'Edit Book' : 'Add New Book'}</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-slate-400 text-xs mb-1">Book Title</label>
                  <input type="text" value={editBook.title || ''} onChange={(e) => setEditBook({...editBook, title: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1">Category</label>
                  <select value={editBook.category || 'Novel'} onChange={(e) => setEditBook({...editBook, category: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                    {CATEGORIES.map((c) => <option className="bg-slate-900 text-white" key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1">Publication Year</label>
                  <input type="number" value={editBook.publicationYear || ''} onChange={(e) => setEditBook({...editBook, publicationYear: Number(e.target.value)})}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1">Publisher</label>
                  <input type="text" value={editBook.publisher || ''} onChange={(e) => setEditBook({...editBook, publisher: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1">Number of Pages</label>
                  <input type="number" value={editBook.pages || ''} onChange={(e) => setEditBook({...editBook, pages: Number(e.target.value)})}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                </div>
                <div className="col-span-2">
                  <label className="block text-slate-400 text-xs mb-1">Short Description</label>
                  <textarea value={editBook.shortDescription || ''} onChange={(e) => setEditBook({...editBook, shortDescription: e.target.value})} rows={2}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"/>
                </div>
                <div className="col-span-2">
                  <label className="block text-slate-400 text-xs mb-1">Full Description</label>
                  <textarea value={editBook.fullDescription || ''} onChange={(e) => setEditBook({...editBook, fullDescription: e.target.value})} rows={3}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"/>
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1">Cover Image</label>
                  <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                    className="w-full text-slate-400 text-sm"/>
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1">Display Order</label>
                  <input type="number" value={editBook.displayOrder ?? 0} onChange={(e) => setEditBook({...editBook, displayOrder: Number(e.target.value)})}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="featured" checked={!!editBook.featured} onChange={(e) => setEditBook({...editBook, featured: e.target.checked})}
                    className="w-4 h-4 accent-purple-500"/>
                  <label htmlFor="featured" className="text-slate-400 text-sm">Featured Book</label>
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1">Status</label>
                  <select value={editBook.status || 'published'} onChange={(e) => setEditBook({...editBook, status: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option className="bg-slate-900 text-white" value="published">Published</option>
                    <option className="bg-slate-900 text-white" value="unpublished">Unpublished</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-white/10">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 rounded-xl border border-white/10 text-slate-400 hover:text-white transition text-sm">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-60">
                {saving ? 'Saving...' : 'Save Book'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
