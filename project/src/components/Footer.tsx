import React from 'react';
import { Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 tracking-wide">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 justify-items-center text-center">
          {/* About Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-bold text-red-400 tracking-normal">منصة المتطوعين</h3>
            <p className="text-gray-300 leading-relaxed tracking-normal">
              منصة رسمية لتنظيم الأنشطة التطوعية في سلطنة عمان، تهدف إلى ربط المتطوعين بالفرص المتاحة لخدمة المجتمع.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="https://www.facebook.com/mcsy.gov.om/?locale=ar_AR" className="text-gray-400 hover:text-red-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://x.com/mcsy_om?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" className="text-gray-400 hover:text-red-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/mcsyom/?hl=ar" className="text-gray-400 hover:text-red-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
<div className="flex flex-col space-y-4">
  <h3 className="text-xl font-bold text-red-400 tracking-normal">روابط سريعة</h3>
  <ul className="flex flex-col space-y-2 pl-0">
    <li>
      <a href="#" className="text-gray-300 hover:text-white transition-colors tracking-normal">
        الشروط والأحكام
      </a>
    </li>
    <li>
      <a href="#" className="text-gray-300 hover:text-white transition-colors tracking-normal">
        سياسة الخصوصية
      </a>
    </li>
  </ul>
</div>

{/* Ministry Contact */ }
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-bold text-red-400 tracking-normal">وزارة الثقافة والرياضة والشباب</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="w-5 h-5 text-red-400 flex-shrink-0" />
                <div className="flex flex-col space-y-1">
                  <p className="text-gray-300 tracking-normal">هاتف: +968 24605000</p>
                  <p className="text-gray-300 tracking-normal">فاكس: +968 24605001</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Map */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-bold text-red-400 tracking-normal">الموقع</h3>
            <div className="flex items-start space-x-3 rtl:space-x-reverse">
              <MapPin className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
              <p className="text-gray-300 leading-relaxed tracking-normal">
                وزارة الثقافة والرياضة والشباب<br />
                مبنى الوزارة - القرم<br />
                مسقط - سلطنة عمان<br />
                ص.ب: 113 الرمز البريدي: 133
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm tracking-normal">
              © 2025 وزارة الثقافة والرياضة والشباب - سلطنة عمان. جميع الحقوق محفوظة.
            </p>
            <p className="text-gray-400 text-sm tracking-normal">
              تم التطوير بواسطة الفريق نظم
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
