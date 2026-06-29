'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart2,
  User,
  BookOpen, 
  Image as ImageIcon,
  FolderOpen,
  LogOut,
  BookMarked,
  Menu,
  X
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
    { name: 'About Page', href: '/admin/about', icon: User },
    { name: 'Books', href: '/admin/books', icon: BookOpen },
    { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
    { name: 'Media Library', href: '/admin/media', icon: FolderOpen },
  ];

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col md:flex-row font-sans text-slate-200">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-[#0f172a] border-b border-slate-800 p-4 h-16 shrink-0 relative z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <BookMarked className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-bold text-white tracking-wide">Literacture</h1>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-slate-300 hover:text-white p-2"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out w-64 bg-[#0f172a] border-r border-slate-800 flex flex-col
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo Area (Desktop only, Mobile handled in Top Bar) */}
        <div className="hidden md:flex h-16 items-center px-6 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
              <BookMarked className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white tracking-wide">Literacture</h1>
            <div className="ml-auto text-slate-500 text-xs">«</div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileMenu}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-md shadow-pink-900/20'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <item.icon
                  className={`mr-3 h-4 w-4 flex-shrink-0 ${
                    isActive ? 'text-white' : 'text-slate-400'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile / Logout Area */}
        <div className="p-4 border-t border-slate-800 shrink-0">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold border border-slate-700">
              A
            </div>
            <div>
              <div className="text-sm font-bold text-white">Admin</div>
              <div className="text-xs text-slate-500">admin</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mr-3">
              <span className="text-xs font-bold">N</span>
            </div>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-screen">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#020617] p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
