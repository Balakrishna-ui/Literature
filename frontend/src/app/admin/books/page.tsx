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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Books</h2>
          <p className="text-zinc-500 mt-1">Manage your literary works and publications.</p>
        </div>
        <Link 
          href="/admin/books/new"
          className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Book
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-zinc-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input 
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-zinc-500">Loading books...</div>
        ) : filteredBooks.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
              <ImageIcon className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-lg font-medium text-zinc-900">No books found</h3>
            <p className="text-zinc-500 mt-1 mb-6">Get started by adding your first publication.</p>
            <Link 
              href="/admin/books/new"
              className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Book
            </Link>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Year</th>
                <th className="px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-900">{book.title}</td>
                  <td className="px-6 py-4 text-zinc-600">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800">
                      {book.category.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-600">{book.publishedYear || '-'}</td>
                  <td className="px-6 py-4">
                    {book.isFeatured ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Featured
                      </span>
                    ) : (
                      <span className="text-zinc-400 text-sm">Standard</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link href={`/admin/books/${book.id}/edit`} className="text-blue-600 hover:text-blue-800 inline-flex items-center">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button className="text-red-600 hover:text-red-800 inline-flex items-center">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
