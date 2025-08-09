// src/components/EditEventPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Upload } from 'lucide-react';
import '../styles/modal.css';

export interface Event {
  _id: string;
  title: string;
  ministry: string;
  date: string;
  time: string;
  location: string;
  volunteers: number;
  maxVolunteers: number;
  leader: string;
  status: string;
  description: string;
  image: string;
}

interface EditEventPageProps {
  event: Event;
  onBack: () => void;
}

const EditEventPage: React.FC<EditEventPageProps> = ({ event, onBack }) => {
  // منع تمرير الخلفية عند فتح المودال
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const [formData, setFormData] = useState<Event>({ ...event });
  const [message, setMessage] = useState<string | null>(null);

  const ministries = [
    'وزارة الثقافة والرياضة والشباب',
    'وزارة البيئة والشؤون المناخية',
    'وزارة التراث والسياحة',
    'وزارة التنمية الاجتماعية',
    'وزارة الصحة',
    'وزارة التربية والتعليم',
    'وزارة الزراعة والثروة السمكية والموارد المائية',
    'وزارة النقل والاتصالات وتقنية المعلومات'
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3005/events/${formData._id}`, formData)
      .then(() => {
        setMessage('تم تحديث الفعالية بنجاح');
        setTimeout(onBack, 1500);
      })
      .catch(() => setMessage('فشل في تحديث الفعالية'));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto p-4"
    >
      <div className="modal-content max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg">
        <div className="modal-header p-4 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">تعديل الفعالية</h2>
          <button onClick={onBack} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {message && (
            <div className="text-center text-sm text-blue-600">{message}</div>
          )}

          {/* عنوان ووزارة */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">عنوان الفعالية</label>
              <input
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="form-input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">الوزارة المنظمة</label>
              <select
                name="ministry"
                value={formData.ministry}
                onChange={handleChange}
                className="form-input w-full"
              >
                {ministries.map(min => (
                  <option key={min} value={min}>
                    {min}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* تاريخ ووقت */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">التاريخ</label>
              <input
                name="date"
                type="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="form-input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">الوقت</label>
              <input
                name="time"
                type="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="form-input w-full"
              />
            </div>
          </div>

          {/* الموقع والمتطوعين والقائد */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">الموقع</label>
              <input
                name="location"
                type="text"
                required
                value={formData.location}
                onChange={handleChange}
                className="form-input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">عدد المتطوعين</label>
              <input
                name="maxVolunteers"
                type="number"
                min={0}
                value={formData.maxVolunteers}
                onChange={handleChange}
                className="form-input w-full"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">قائد المتطوعين</label>
              <input
                name="leader"
                type="text"
                required
                value={formData.leader}
                onChange={handleChange}
                className="form-input w-full"
              />
            </div>
          </div>

          {/* الوصف */}
          <div>
            <label className="block text-sm font-medium mb-1">وصف الفعالية</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input w-full h-24 resize-none"
            />
          </div>

          {/* صورة الفعالية */}
          <div>
            <label className="block text-sm font-medium mb-1">تغيير الصورة</label>
            <div className="border-2 border-dashed p-6 text-center rounded-lg hover:border-purple-400 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="edit-image-upload"
              />
              <label htmlFor="edit-image-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600">اضغط لاختيار صورة أو اسحب وأفلت</p>
                <p className="text-sm text-gray-500">PNG, JPG, GIF حتى 10MB</p>
              </label>
              {formData.image && (
                <img
                  src={formData.image}
                  alt="معاينة"
                  className="w-32 h-32 object-cover rounded-lg mx-auto mt-4"
                />
              )}
            </div>
          </div>

          {/* أزرار الإجراء */}
          <div className="flex space-x-4 rtl:space-x-reverse">
            <button type="submit" className="btn-primary flex-1">
              تحديث الفعالية
            </button>
            <button type="button" onClick={onBack} className="btn-secondary flex-1">
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventPage;
