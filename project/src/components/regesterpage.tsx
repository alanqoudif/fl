import React, { useState } from 'react';
import { ChevronLeft, User, Mail, Phone, Heart, Calendar } from 'lucide-react';

interface RegisterPageProps {
  onBack: () => void;
  onSubmit: (formData: any) => void;
}

const sportsOptions = [
  'كرة القدم',
  'السباحة',
  'كرة السلة',
  'التنس',
  'الجري',
];

const RegisterPage: React.FC<RegisterPageProps> = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    sports: [] as string[],
    otherSport: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSportsChange = (sport: string) => {
    setFormData((prev) => {
      const exists = prev.sports.includes(sport);
      return {
        ...prev,
        sports: exists
          ? prev.sports.filter((s) => s !== sport)
          : [...prev.sports, sport],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalFormData = {
      ...formData,
      sports: [...formData.sports, ...(formData.otherSport ? [formData.otherSport] : [])],
    };
    onSubmit(finalFormData);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8" dir="rtl">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 flex items-center space-x-2 space-x-reverse"
          type="button"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>عودة</span>
        </button>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">تسجيل كمتطوع رياضي</h2>
      <p className="text-center text-gray-500 mb-8">
        املأ البيانات التالية للانضمام إلى مجتمع المتطوعين الرياضيين
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* الاسم */}
        <div>
          <label
            htmlFor="name"
            className="block mb-2 font-medium text-gray-700 flex items-center space-x-2 space-x-reverse"
          >
            <User className="w-5 h-5" />
            <span>الاسم الكامل</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="أدخل اسمك الكامل"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* البريد الإلكتروني */}
        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-medium text-gray-700 flex items-center space-x-2 space-x-reverse"
          >
            <Mail className="w-5 h-5" />
            <span>البريد الإلكتروني</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="example@example.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* رقم الهاتف */}
        <div>
          <label
            htmlFor="phone"
            className="block mb-2 font-medium text-gray-700 flex items-center space-x-2 space-x-reverse"
          >
            <Phone className="w-5 h-5" />
            <span>رقم الهاتف</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+968 9XXXXXXX"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* العمر */}
        <div>
          <label
            htmlFor="age"
            className="block mb-2 font-medium text-gray-700 flex items-center space-x-2 space-x-reverse"
          >
            <Calendar className="w-5 h-5" />
            <span>العمر</span>
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            placeholder="أدخل عمرك"
            min={1}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* اختبار الرياضات */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 flex items-center space-x-2 space-x-reverse">
            <Heart className="w-5 h-5" />
            <span>الرياضات المهتم بها للتطوع</span>
          </label>
          <div className="grid grid-cols-2 gap-2 mb-2">
            {sportsOptions.map((sport) => (
              <label key={sport} className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="checkbox"
                  value={sport}
                  checked={formData.sports.includes(sport)}
                  onChange={() => handleSportsChange(sport)}
                  className="accent-blue-600"
                />
                <span>{sport}</span>
              </label>
            ))}
          </div>

          {/* رياضة أخرى (نص اختياري) */}
          <input
            type="text"
            name="otherSport"
            value={formData.otherSport}
            onChange={handleChange}
            placeholder="هل لديك رياضة أخرى؟ اذكرها هنا"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* زر الإرسال */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors duration-300"
          >
            تسجيل
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
