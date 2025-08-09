import React, { useState } from 'react';
import { Heart, User } from 'lucide-react';

interface HealthRecordProps {
  onNavigate: (page: string) => void;
}

const HealthRecord: React.FC<HealthRecordProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('personal');

  const [errorMessage, setErrorMessage] = useState('');

  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    idNumber: '',
    birthDate: '',
    phone: '',
    email: '',
    emergencyContact: '',
    emergencyPhone: '',
  });

  const [medicalInfo, setMedicalInfo] = useState({
    bloodType: '',
    bloodTypeDescription: '',
    chronicDiseases: '',
    medications: '',
    allergies: '',
    hasDisability: '',
    disabilityType: '',
    disabilityDescription: '',
    needsSupport: '',
  });

  const handleSave = () => {
    // التحقق من الحقول الأساسية
    if (!personalInfo.fullName || !personalInfo.idNumber || !personalInfo.phone) {
      setErrorMessage('يرجى تعبئة جميع الحقول الشخصية الأساسية.');
      return;
    }

    if (!medicalInfo.bloodType) {
      setErrorMessage('يرجى تحديد فصيلة الدم.');
      return;
    }

    if (medicalInfo.bloodType === 'أخرى' && !medicalInfo.bloodTypeDescription) {
      setErrorMessage('يرجى كتابة وصف لفصيلة الدم.');
      return;
    }

    if (medicalInfo.hasDisability === 'yes') {
      if (!medicalInfo.disabilityType) {
        setErrorMessage('يرجى تحديد نوع الإعاقة.');
        return;
      }

      if (medicalInfo.disabilityType === 'أخرى' && !medicalInfo.disabilityDescription) {
        setErrorMessage('يرجى وصف الإعاقة.');
        return;
      }
    }

    setErrorMessage('');
    onNavigate('volunteers');
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">سجل المعلومات الصحية</h2>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'personal', label: 'المعلومات الشخصية', icon: User },
                { id: 'medical', label: 'المعلومات الطبية', icon: Heart },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 space-x-reverse px-4 py-4 text-sm font-medium transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {errorMessage && (
              <div className="mb-4 text-red-700 font-medium bg-red-100 px-4 py-2 rounded-lg">
                {errorMessage}
              </div>
            )}

            {activeTab === 'personal' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">المعلومات الشخصية</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                    <input
                      type="text"
                      value={personalInfo.fullName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهوية</label>
                    <input
                      type="text"
                      value={personalInfo.idNumber}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, idNumber: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      placeholder="أدخل رقم الهوية"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الميلاد</label>
                    <input
                      type="date"
                      value={personalInfo.birthDate}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, birthDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                    <input
                      type="tel"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      placeholder="أدخل رقم الهاتف"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      placeholder="أدخل البريد الإلكتروني"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">اسم جهة الاتصال للطوارئ</label>
                    <input
                      type="text"
                      value={personalInfo.emergencyContact}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, emergencyContact: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      placeholder="أدخل اسم جهة الاتصال للطوارئ"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">رقم هاتف الطوارئ</label>
                    <input
                      type="tel"
                      value={personalInfo.emergencyPhone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, emergencyPhone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      placeholder="أدخل رقم هاتف الطوارئ"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'medical' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">المعلومات الطبية</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">فصيلة الدم</label>
                    <select
                      value={medicalInfo.bloodType}
                      onChange={(e) => setMedicalInfo({ ...medicalInfo, bloodType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    >
                      <option value="">اختر فصيلة الدم</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  {medicalInfo.bloodType === 'أخرى' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">وصف فصيلة الدم</label>
                      <input
                        type="text"
                        value={medicalInfo.bloodTypeDescription}
                        onChange={(e) => setMedicalInfo({ ...medicalInfo, bloodTypeDescription: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                        placeholder="يرجى توضيح فصيلة الدم"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الأمراض المزمنة</label>
                    <textarea
                      value={medicalInfo.chronicDiseases}
                      onChange={(e) => setMedicalInfo({ ...medicalInfo, chronicDiseases: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none h-20"
                      placeholder="أدخل الأمراض المزمنة إن وجدت"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الأدوية المستخدمة</label>
                    <textarea
                      value={medicalInfo.medications}
                      onChange={(e) => setMedicalInfo({ ...medicalInfo, medications: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none h-20"
                      placeholder="أدخل الأدوية المستخدمة إن وجدت"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الحساسية</label>
                    <textarea
                      value={medicalInfo.allergies}
                      onChange={(e) => setMedicalInfo({ ...medicalInfo, allergies: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none h-20"
                      placeholder="أدخل الحساسية إن وجدت"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">هل لديك إعاقة؟</label>
                    <select
                      value={medicalInfo.hasDisability}
                      onChange={(e) => setMedicalInfo({ ...medicalInfo, hasDisability: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    >
                      <option value="">اختر</option>
                      <option value="yes">نعم</option>
                      <option value="no">لا</option>
                    </select>
                  </div>

                  {medicalInfo.hasDisability === 'yes' && (
                    <>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">نوع الإعاقة</label>
                        <select
                          value={medicalInfo.disabilityType}
                          onChange={(e) => setMedicalInfo({ ...medicalInfo, disabilityType: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                        >
                          <option value="">اختر نوع الإعاقة</option>
                          <option value="حركية">حركية</option>
                          <option value="سمعية">سمعية</option>
                          <option value="بصرية">بصرية</option>
                          <option value="ذهنية">ذهنية</option>
                          <option value="أخرى">أخرى</option>
                        </select>
                      </div>

                      {medicalInfo.disabilityType === 'أخرى' && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">وصف الإعاقة</label>
                          <textarea
                            value={medicalInfo.disabilityDescription}
                            onChange={(e) => setMedicalInfo({ ...medicalInfo, disabilityDescription: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none h-20"
                            placeholder="يرجى وصف الإعاقة"
                          />
                        </div>
                      )}

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">هل تحتاج لدعم خاص في الأنشطة التطوعية؟</label>
                        <select
                          value={medicalInfo.needsSupport}
                          onChange={(e) => setMedicalInfo({ ...medicalInfo, needsSupport: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                        >
                          <option value="">اختر</option>
                          <option value="نعم">نعم</option>
                          <option value="لا">لا</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 p-6">
            <div className="flex space-x-4 space-x-reverse">
              <button
                onClick={handleSave}
                className="flex-1 py-3 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700"
              >
                حفظ والعودة للفعاليات
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-300 font-medium"
              >
                العودة للرئيسية
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecord;
