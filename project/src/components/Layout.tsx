import React, { useState } from 'react';
import { 
  Home, 
  Calendar, 
  GraduationCap, 
  CalendarDays, 
  LogOut,
  X,
  User
} from 'lucide-react';
import '../styles/layout.css';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: Home },
    { id: 'events', label: 'الفعاليات', icon: Calendar },
    { id: 'training', label: 'التدريب', icon: GraduationCap },
    { id: 'calendar', label: 'التقويم', icon: CalendarDays },
  ];

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 right-0 z-30 w-64 sidebar transform ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        
        {/* Logo Section */}
        <div className="flex items-center justify-between h-16 px-6 bg-black bg-opacity-20">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Home className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-white font-bold text-lg">نظام الإدارة</span>
          </div>
          <button 
            className="lg:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Profile */}
        <div className="px-6 py-4 border-b border-white border-opacity-20">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-white font-medium">مدير النظام</div>
              <div className="text-purple-200 text-sm">admin@ministry.gov</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setSidebarOpen(false);
                }}
                className={`sidebar-item w-full flex items-center space-x-3 rtl:space-x-reverse px-3 py-3 text-right rounded-lg mb-2 ${
                  currentPage === item.id ? 'active' : ''
                }`}
              >
                <Icon className="w-5 h-5 text-white" />
                <span className="text-white font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-0 right-0 px-3">
          <button
            onClick={() => onNavigate('logout')}
            className="sidebar-item w-full flex items-center space-x-3 rtl:space-x-reverse px-3 py-3 text-right rounded-lg text-red-200 hover:text-white hover:bg-red-500 hover:bg-opacity-20"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto main-content">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;