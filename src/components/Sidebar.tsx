import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  Users, 
  FileText, 
  Home,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();

  const navigation = user?.role === 'admin' 
    ? [
        { name: 'Dashboard', href: '/', icon: Home },
        { name: 'Courses', href: '/courses', icon: BookOpen },
        { name: 'Students', href: '/students', icon: Users },
        { name: 'Materials', href: '/materials', icon: FileText },
      ]
    : [
        { name: 'Dashboard', href: '/', icon: Home },
        { name: 'My Courses', href: '/my-courses', icon: BookOpen },
      ];

  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center justify-between px-4 lg:hidden">
            <h1 className="text-2xl font-bold text-indigo-600">EduHub</h1>
            <button
              onClick={() => setOpen(false)}
              className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}