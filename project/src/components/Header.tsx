import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  Home,
  GraduationCap,
  Settings,
  User,
  Book,
  Bot,
  ChevronDown,
  LogIn,
} from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'volunteers', label: 'الفعاليات', icon: Users },
    { id: 'training', label: 'التدريب والتأهيل', icon: GraduationCap },
    { id: 'admin', label: 'تسجيل الدخول', icon: LogIn },
    { id: 'setting', label: 'الإعدادات', icon: Settings },
  ];

  // إغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSettingsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // إظهار الهيدر فقط عند الوصول لأعلى الصفحة
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY === 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`bg-white shadow-lg sticky top-0 z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/* الشعار */}
          <div className="flex items-center space-x-2 space-x-reverse">
            <img src="111.png" alt="Logo" className="w-16 h-16" />
            <div>
              <h1 className="text-m font-bold text-gray-800">منصة المتطوعين الرياضيين</h1>
              <p className="text-12 text-gray-600">وزارة الثقافة والرياضة والشباب</p>
            </div>
          </div>

          {/* القائمة */}
          <nav className="flex-grow flex justify-center space-x-8 space-x-reverse">
            {navItems.map((item) => {
              const Icon = item.icon;

              if (item.id === 'setting') {
                return (
                  <div key={item.id} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setSettingsOpen(!settingsOpen)}
                      className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg transition-all duration-300 ${
                        currentPage === item.id
                          ? 'bg-blue-100 text-blue-700 shadow-md'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {settingsOpen && (
                      <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md z-50 text-right">
                        <li
                          className="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSettingsOpen(false);
                            onNavigate('profile');
                          }}
                        >
                          <User className="w-4 h-4" />
                          <span>الملف الشخصي</span>
                        </li>
                        <li
                          className="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSettingsOpen(false);
                            alert('فتح كتاب المتطوع');
                          }}
                        >
                          <Book className="w-4 h-4" />
                          <span>كتاب المتطوع</span>
                        </li>
                        <li
                          className="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSettingsOpen(false);
                            onNavigate('chatbot');
                          }}
                        >
                          <Bot className="w-4 h-4" />
                          <span>Chat Bot</span>
                        </li>
                      </ul>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-blue-100 text-blue-700 shadow-md'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* مسافة فارغة لضبط المحاذاة */}
          <div style={{ width: 40 }}></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
