'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Image as ImageIcon, 
  User, 
  LogOut 
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'About Page', href: '/admin/about', icon: User },
    { name: 'Books', href: '/admin/books', icon: BookOpen },
    { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  ];

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-64 bg-white shadow-md">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? 'text-white' : 'text-gray-400'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 transition-colors mt-8"
          >
            <LogOut className="mr-3 h-5 w-5 flex-shrink-0 text-red-500" />
            Sign Out
          </button>
        </nav>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex items-center justify-end px-8">
           <div className="text-sm font-medium text-gray-500">Welcome, Super Admin</div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
