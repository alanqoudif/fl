import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import '../styles/modal.css';

interface Event {
  title: string;
  ministry: string;
  date: string;
  time: string;
  location: string;
  maxVolunteers: number;
  leader: string;
  description: string;
  image: string;
}

interface AddEventModalProps {
  onClose: () => void;
  onAdd: (event: Event) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ onClose, onAdd }) => {
  const [newEvent, setNewEvent] = useState<Event>({
    title: '',
    ministry: 'وزارة الثقافة والرياضة والشباب',
    date: '',
    time: '',
    location: '',
    maxVolunteers: 0,
    leader: '',
    description: '',
    image: ''
  });

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewEvent(prev => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }



  };

  return (
    <div className="modal-overlay fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="modal-content max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="modal-header">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-800">إضافة فعالية جديدة</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان الفعالية *
                </label>
                <input
                  type="text"
                  required
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="form-input w-full"
                  placeholder="أدخل عنوان الفعالية"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الوزارة المنظمة *
                </label>
                <select
                  required
                  value={newEvent.ministry}
                  onChange={(e) => setNewEvent({ ...newEvent, ministry: e.target.value })}
                  className="form-input w-full"
                >
                  {ministries.map((ministry) => (
                    <option key={ministry} value={ministry}>
                      {ministry}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  التاريخ *
                </label>
                <input
                  type="date"
                  required
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="form-input w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الوقت *
                </label>
                <input
                  type="time"
                  required
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="form-input w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الموقع *
              </label>
              <input
                type="text"
                required
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                className="form-input w-full"
                placeholder="أدخل موقع الفعالية"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عدد المتطوعين المطلوب *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={newEvent.maxVolunteers}
                  onChange={(e) => setNewEvent({ ...newEvent, maxVolunteers: Number(e.target.value) })}
                  className="form-input w-full"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  قائد المتطوعين *
                </label>
                <input
                  type="text"
                  required
                  value={newEvent.leader}
                  onChange={(e) => setNewEvent({ ...newEvent, leader: e.target.value })}
                  className="form-input w-full"
                  placeholder="اسم قائد المتطوعين"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                وصف الفعالية
              </label>
              <textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className="form-input w-full h-24 resize-none"
                placeholder="أدخل وصفاً مفصلاً للفعالية..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                صورة الفعالية
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">اضغط لاختيار صورة أو اسحب وأفلت</p>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF حتى 10MB</p>
                </label>

                {newEvent.image && (
                  <div className="mt-4">
                    <img
                      src={newEvent.image}
                      alt="معاينة"
                      className="w-32 h-32 object-cover rounded-lg mx-auto"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex space-x-4 rtl:space-x-reverse mt-8">
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              إضافة الفعالية
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;