import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  GraduationCap, 
  Clock, 
  Users, 
  Star,
  Edit3,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Award,
  Search,
  Filter
} from 'lucide-react';
import AddTrainingModal from './AddTrainingModal';
import '../styles/training.css';

interface Training {
  _id: string;
  title: string;
  ministry: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  maxParticipants: number;
  instructor: string;
  level: string;
  duration: string;
  description: string;
  image: string;
  category: string;
}

interface TrainingProps {
  onNavigate: (page: string) => void;
  onTrainingSelect: (training: Training) => void;
}

const Training: React.FC<TrainingProps> = ({ onNavigate, onTrainingSelect }) => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock data for demonstration
  useEffect(() => {
    setTimeout(() => {
      setTrainings([
        {
          _id: '1',
          title: 'دورة إدارة الفعاليات',
          ministry: 'وزارة الثقافة والرياضة والشباب',
          date: '2024-12-15',
          time: '09:00',
          location: 'قاعة التدريب الرئيسية',
          participants: 12,
          maxParticipants: 20,
          instructor: 'د. سالم المحروقي',
          level: 'متقدم',
          duration: '3 أيام',
          description: 'دورة شاملة في إدارة وتنظيم الفعاليات الثقافية',
          image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg',
          category: 'إدارة'
        },
        {
          _id: '2',
          title: 'ورشة التطوع البيئي',
          ministry: 'وزارة البيئة والشؤون المناخية',
          date: '2024-12-18',
          time: '14:00',
          location: 'المركز البيئي',
          participants: 8,
          maxParticipants: 15,
          instructor: 'أ. منى الكندي',
          level: 'مبتدئ',
          duration: 'يوم واحد',
          description: 'تدريب على أساسيات التطوع في المجال البيئي',
          image: 'https://images.pexels.com/photos/2292837/pexels-photo-2292837.jpeg',
          category: 'بيئة'
        },
        {
          _id: '3',
          title: 'برنامج القيادة التطوعية',
          ministry: 'وزارة التنمية الاجتماعية',
          date: '2024-12-22',
          time: '10:00',
          location: 'مركز التنمية المهنية',
          participants: 5,
          maxParticipants: 12,
          instructor: 'د. أحمد البلوشي',
          level: 'متقدم',
          duration: '5 أيام',
          description: 'برنامج لتأهيل قادة المتطوعين',
          image: 'https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg',
          category: 'قيادة'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddTraining = (newTraining: Omit<Training, '_id' | 'participants'>) => {
    const training: Training = {
      ...newTraining,
      _id: Date.now().toString(),
      participants: 0
    };
    setTrainings(prev => [...prev, training]);
    setShowAddModal(false);
  };

  const handleDeleteTraining = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا التدريب؟')) {
      setTrainings(prev => prev.filter(t => t._id !== id));
    }
  };

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterLevel === 'all' || training.level === filterLevel;
    return matchesSearch && matchesFilter;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'مبتدئ': return 'from-green-400 to-emerald-500';
      case 'متوسط': return 'from-yellow-400 to-orange-500';
      case 'متقدم': return 'from-red-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">إدارة التدريب</h1>
          <p className="text-gray-600">إدارة وتنظيم برامج التدريب التطوعي</p>
        </div>
        
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            {viewMode === 'grid' ? 'عرض قائمة' : 'عرض شبكة'}
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="البحث في التدريبات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">جميع المستويات</option>
              <option value="مبتدئ">مبتدئ</option>
              <option value="متوسط">متوسط</option>
              <option value="متقدم">متقدم</option>
            </select>
          </div>
        </div>
      </div>

      {/* Training Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-orange-500 to-pink-600 text-white p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <GraduationCap className="w-8 h-8" />
            <div className="text-2xl font-bold">{trainings.length}</div>
          </div>
          <div className="text-orange-100">إجمالي التدريبات</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8" />
            <div className="text-2xl font-bold">
              {trainings.reduce((sum, t) => sum + t.participants, 0)}
            </div>
          </div>
          <div className="text-green-100">إجمالي المشاركين</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8" />
            <div className="text-2xl font-bold">
              {trainings.filter(t => new Date(t.date) > new Date()).length}
            </div>
          </div>
          <div className="text-blue-100">تدريبات قادمة</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-violet-600 text-white p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-8 h-8" />
            <div className="text-2xl font-bold">4.8</div>
          </div>
          <div className="text-purple-100">متوسط التقييم</div>
        </div>
      </div>

      {/* Training Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainings.map((training) => (
            <div key={training._id} className="training-card">
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <img 
                  src={training.image} 
                  alt={training.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`training-level bg-gradient-to-r ${getLevelColor(training.level)}`}>
                    {training.level}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="training-duration">
                    <Clock className="w-4 h-4" />
                    <span>{training.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-orange-600 font-medium bg-orange-100 px-2 py-1 rounded-full">
                    {training.category}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm text-gray-600 mr-1">4.8</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">{training.title}</h3>
                <p className="text-sm text-orange-600 mb-3">{training.ministry}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 ml-2" />
                    <span>{training.date}</span>
                    <Clock className="w-4 h-4 mr-4 ml-2" />
                    <span>{training.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 ml-2" />
                    <span>{training.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4 ml-2" />
                    <span>المدرب: {training.instructor}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>المشاركون</span>
                    <span>{training.participants}/{training.maxParticipants}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-400 to-pink-500 h-2 rounded-full transition-all duration-300" 
                      style={{width: `${(training.participants/training.maxParticipants)*100}%`}}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onTrainingSelect(training);
                        onNavigate('edit-training');
                      }}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteTraining(training._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span>{training.maxParticipants - training.participants} مقعد متاح</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gradient-to-r from-orange-50 to-pink-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">الصورة</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">التدريب</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">المستوى</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">التاريخ</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">المدة</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">المشاركون</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">المدرب</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTrainings.map((training) => (
                  <tr key={training._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <img 
                        src={training.image} 
                        alt={training.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{training.title}</div>
                      <div className="text-sm text-orange-600">{training.ministry}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`training-level bg-gradient-to-r ${getLevelColor(training.level)} text-white`}>
                        {training.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">{training.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{training.duration}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-medium text-gray-800">
                          {training.participants}/{training.maxParticipants}
                        </span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-orange-400 to-pink-500 h-2 rounded-full"
                            style={{width: `${(training.participants/training.maxParticipants)*100}%`}}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <GraduationCap className="w-4 h-4 ml-2" />
                        {training.instructor}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            onTrainingSelect(training);
                            onNavigate('edit-training');
                          }}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteTraining(training._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredTrainings.length === 0 && (
        <div className="text-center py-12">
          <GraduationCap className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">لا توجد تدريبات</h3>
          <p className="text-gray-500 mb-6">ابدأ بإضافة برنامج تدريبي جديد</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary"
          >
            إضافة تدريب جديد
          </button>
        </div>
      )}

      {/* Floating Add Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="floating-add-btn"
        style={{background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'}}
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* Add Training Modal */}
      {showAddModal && (
        <AddTrainingModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddTraining}
        />
      )}
    </div>
  );
};

export default Training;