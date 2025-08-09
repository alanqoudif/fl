import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface Training {
  title: string;
  ministry: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  instructor: string;
  level: string;
  duration: string;
  description: string;
  image: string;
}

interface AddTrainingModalProps {
  onClose: () => void;
  onAdd: (training: Training) => void;
}

const AddTrainingModal: React.FC<AddTrainingModalProps> = ({ onClose, onAdd }) => {
  const [newTraining, setNewTraining] = useState<Training>({
    title: '',
    ministry: 'وزارة الثقافة والرياضة والشباب',
    date: '',
    time: '',
    location: '',
    maxParticipants: 0,
    instructor: '',
    level: 'مبتدئ',
    duration: '',
    description: '',
    image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg'
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

  const levels = ['مبتدئ', 'متوسط', 'متقدم'];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // التحقق من حجم الملف (أقل من 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('حجم الصورة يجب أن يكون أقل من 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewTraining(prev => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTraining.title.trim()) {
      alert('يرجى إدخال عنوان التدريب');
      return;
    }

    if (!newTraining.date) {
      alert('يرجى إدخال تاريخ التدريب');
      return;
    }

    if (!newTraining.time) {
      alert('يرجى إدخال وقت التدريب');
      return;
    }

    if (!newTraining.location.trim()) {
      alert('يرجى إدخال موقع التدريب');
      return;
    }

    if (newTraining.maxParticipants <= 0) {
      alert('يرجى إدخال عدد المشاركين المطلوب');
      return;
    }

    if (!newTraining.instructor.trim()) {
      alert('يرجى إدخال اسم المدرب');
      return;
    }

    if (!newTraining.duration.trim()) {
      alert('يرجى إدخال مدة التدريب');
      return;
    }

    onAdd(newTraining);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-800">إضافة برنامج تدريبي جديد</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* عنوان التدريب والوزارة */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان التدريب *
                </label>
                <input
                  type="text"
                  required
                  value={newTraining.title}
                  onChange={(e) => setNewTraining({ ...newTraining, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  placeholder="أدخل عنوان التدريب"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الوزارة المنظمة *
                </label>
                <select
                  required
                  value={newTraining.ministry}
                  onChange={(e) => setNewTraining({ ...newTraining, ministry: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                >
                  {ministries.map((ministry) => (
                    <option key={ministry} value={ministry}>
                      {ministry}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* التاريخ والوقت */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  التاريخ *
                </label>
                <input
                  type="date"
                  required
                  value={newTraining.date}
                  onChange={(e) => setNewTraining({ ...newTraining, date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الوقت *
                </label>
                <input
                  type="time"
                  required
                  value={newTraining.time}
                  onChange={(e) => setNewTraining({ ...newTraining, time: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* الموقع */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الموقع *
              </label>
              <input
                type="text"
                required
                value={newTraining.location}
                onChange={(e) => setNewTraining({ ...newTraining, location: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                placeholder="أدخل موقع التدريب"
              />
            </div>

            {/* عدد المشاركين والمدرب */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عدد المشاركين المطلوب *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={newTraining.maxParticipants || ''}
                  onChange={(e) => setNewTraining({ ...newTraining, maxParticipants: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المدرب *
                </label>
                <input
                  type="text"
                  required
                  value={newTraining.instructor}
                  onChange={(e) => setNewTraining({ ...newTraining, instructor: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  placeholder="اسم المدرب"
                />
              </div>
            </div>

            {/* المستوى والمدة */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المستوى *
                </label>
                <select
                  required
                  value={newTraining.level}
                  onChange={(e) => setNewTraining({ ...newTraining, level: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المدة *
                </label>
                <input
                  type="text"
                  required
                  value={newTraining.duration}
                  onChange={(e) => setNewTraining({ ...newTraining, duration: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  placeholder="مثال: 3 أيام"
                />
              </div>
            </div>

            {/* وصف التدريب */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                وصف التدريب
              </label>
              <textarea
                value={newTraining.description}
                onChange={(e) => setNewTraining({ ...newTraining, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition h-24 resize-none"
                placeholder="أدخل وصفاً مفصلاً للتدريب..."
              />
            </div>

            {/* رفع صورة */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                صورة التدريب
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="training-image-upload"
                />
                <label htmlFor="training-image-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">اضغط لاختيار صورة أو اسحب وأفلت</p>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF حتى 5MB</p>
                </label>
                
                {newTraining.image && (
                  <div className="mt-4">
                    <img 
                      src={newTraining.image} 
                      alt="معاينة" 
                      className="w-32 h-32 object-cover rounded-lg mx-auto border-2 border-orange-200"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* أزرار التحكم */}
          <div className="flex space-x-4 rtl:space-x-reverse mt-8">
            <button 
              type="submit"
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
            >
              إضافة التدريب
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTrainingModal;