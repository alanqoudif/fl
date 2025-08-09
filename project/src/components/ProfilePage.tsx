import React, { useState, useRef } from 'react';
import { User, Star, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

interface ProfilePageProps {
  user: any;
  onSave?: (updatedUser: any) => void;
}

const levels = [
  { name: 'مبتدئ', color: 'bg-gray-400' },
  { name: 'متوسط', color: 'bg-blue-500' },
  { name: 'متقدم', color: 'bg-purple-600' },
  { name: 'محترف', color: 'bg-yellow-400' },
];

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState({ ...user });
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentLevelIndex = levels.findIndex((lvl) => lvl.name === editableUser.level);
  const percentage = (currentLevelIndex / (levels.length - 1)) * 100;

  const handleChange = (field: string, value: any) => {
    setEditableUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      if (!editableUser.name || !editableUser.email || !editableUser.phone) {
        alert('يرجى تعبئة جميع الحقول قبل الحفظ.');
        return;
      }
      setIsEditing(false);
      if (onSave) onSave(editableUser);
    } else {
      setIsEditing(true);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* القسم الأول: الصورة والمستوى */}
        <section className="bg-white rounded-3xl shadow-lg p-8 grid md:grid-cols-3 items-center gap-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-36 h-36 rounded-full overflow-hidden shadow-xl border-4 border-indigo-600">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="object-cover w-full h-full" />
              ) : (
                <User className="w-20 h-20 text-indigo-600 mx-auto mt-8" />
              )}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                {editableUser.membership || 'عضوية'}
              </div>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition"
            >
              تغيير الصورة
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-700">نقاط المستخدم</h3>
              <span className="text-indigo-700 font-bold text-lg">
                {editableUser.points || 1200} نقطة
              </span>
            </div>
            <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-indigo-700 transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
              <span className="absolute right-3 top-1 text-sm font-bold text-white drop-shadow">
                {Math.round(percentage)}%
              </span>
            </div>
            <div className="text-right text-gray-600 font-medium text-sm mt-1">
              المستوى: <span className="font-semibold text-indigo-700">{editableUser.level || 'مبتدئ'}</span>
            </div>
          </div>
        </section>

        {/* القسم الثاني: التقييم والبيانات الشخصية */}
        <section className="grid md:grid-cols-2 gap-8">

          <div className="bg-white rounded-3xl shadow-md flex flex-col items-center justify-center p-8 text-yellow-500">
            <Star className="w-12 h-12 mb-2" />
            <p className="text-2xl font-extrabold text-gray-800">
              التقييم {editableUser.rating || '4.5'} / 5
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-8 space-y-6">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-6">البيانات الشخصية</h2>
            <div className="space-y-5">
              <div>
                <label className="block mb-1 text-gray-600 font-medium">الاسم</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableUser.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
                  />
                ) : (
                  <div className="bg-gray-100 px-5 py-3 rounded-xl">{editableUser.name}</div>
                )}
              </div>
              <div>
                <label className="block mb-1 text-gray-600 font-medium">البريد الإلكتروني</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editableUser.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
                  />
                ) : (
                  <div className="bg-gray-100 px-5 py-3 rounded-xl">{editableUser.email}</div>
                )}
              </div>
              <div>
                <label className="block mb-1 text-gray-600 font-medium">رقم الهاتف</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editableUser.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
                  />
                ) : (
                  <div className="bg-gray-100 px-5 py-3 rounded-xl">{editableUser.phone}</div>
                )}
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={handleEditToggle}
                className={`mt-6 px-8 py-3 rounded-full font-semibold text-white shadow-lg transition ${
                  isEditing ? 'bg-green-500 hover:bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isEditing ? 'حفظ' : 'تعديل'}
              </button>
            </div>
          </div>
        </section>

        {/* القسم الثالث: الإنجازات والأوسمة */}
        <section className="bg-white rounded-3xl shadow-lg p-8">
          <h3 className="text-center text-2xl font-bold text-gray-800 mb-8">الإنجازات والأوسمة</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'خبير السباحة', description: 'متخصص في فعاليات السباحة', icon: Award, color: 'text-blue-600' },
              { title: 'قائد فريق', description: 'قاد فريق متطوعين', icon: Star, color: 'text-purple-600' },
              { title: 'عضو موثوق', description: 'تم التحقق من بياناته', icon: ShieldCheck, color: 'text-green-600' },
              { title: 'روحه مرحة', description: 'أكثر من تفاعل بالفعاليات', icon: HeartHandshake, color: 'text-pink-600' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-5 p-5 border border-gray-200 rounded-2xl bg-gray-50 hover:shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-default"
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-md">
                    <Icon className={`${item.color} w-8 h-8`} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
                    <p className="text-gray-500 mt-1">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
