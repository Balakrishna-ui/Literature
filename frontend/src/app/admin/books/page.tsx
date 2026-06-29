'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

type Book = {
  id: string;
  title: string;
  category: string;
  isFeatured: boolean;
  publishedYear: string;
};

export default function BooksManager() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/books')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBooks(data.books);
        }
        setLoading(false);
      });
  }, []);

  const filteredBooks = books.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Books</h2>
          <p className="text-slate-400 text-sm">Manage your literary works and publications.</p>
        </div>
        <Link 
          href="/admin/books/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-pink-900/20 transition-all font-medium"
        >
          <Plus className="w-4 h-4" />
          Add New Book
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 bg-[#0f172a] p-4 rounded-xl border border-slate-800 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#1e293b] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          />
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-[#0f172a] rounded-xl border border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading books...</div>
        ) : filteredBooks.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-[#1e293b] rounded-full flex items-center justify-center mb-4 border border-slate-700">
              <ImageIcon className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-lg font-medium text-white">No books found</h3>
            <p className="text-slate-400 mt-1 mb-6 text-sm">Get started by adding your first publication.</p>
            <Link 
              href="/admin/books/new"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-pink-900/20 transition-all font-medium text-sm"
            >
              <Plus className="w-4 h-4" />
              Add New Book
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#1e293b] border-b border-slate-800">
                  <th className="px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Year</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-[#151f38] transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{book.title}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        {book.category.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{book.publishedYear || '-'}</td>
                    <td className="px-6 py-4">
                      {book.isFeatured ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-500/10 text-pink-500 border border-pink-500/20">
                          Featured
                        </span>
                      ) : (
                        <span className="text-slate-500 text-sm">Standard</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <Link href={`/admin/books/${book.id}/edit`} className="text-blue-400 hover:text-blue-300 inline-flex items-center">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button className="text-red-400 hover:text-red-300 inline-flex items-center">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
