import React, { useState } from 'react';
import { ChevronDown, User, Book, Bot } from 'lucide-react';

interface SettingsPageProps {
  onNavigate: (page: string) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onNavigate }) => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-10">
      <div className="relative w-64">
        <button
          onClick={toggleDropdown}
          className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg flex justify-between items-center hover:shadow-md"
        >
          <span>الإعدادات</span>
          <ChevronDown className="w-5 h-5" />
        </button>

        {open && (
          <div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-md absolute w-full z-10">
            <ul className="py-2 text-right text-gray-700 space-y-2 px-3">
              <li
                className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => onNavigate('profile')}
              >
                <User className="w-5 h-5 ml-2" />
                <span>الملف الشخصي</span>
              </li>
              <li
                className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => alert('فتح كتاب المتطوع')}
              >
                <Book className="w-5 h-5 ml-2" />
                <span>كتاب المتطوع</span>
              </li>
              <li
                className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => onNavigate('chatbot')}
              >
                <Bot className="w-5 h-5 ml-2" />
                <span>Chat Bot</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
