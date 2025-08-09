import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Plus,
  Calendar as CalendarIcon,
  MapPin,
  User,
  Edit3,
  Trash2,
  Eye,
  Clock,
  Users,
  Filter,
  Search
} from 'lucide-react';
import AddEventModal from './AddEventModal';
import '../styles/events.css';

interface Event {
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

interface EventsProps {
  onNavigate: (page: string) => void;
  onEventSelect: (event: Event) => void;
}

const Events: React.FC<EventsProps> = ({ onNavigate, onEventSelect }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddEventModal, setShowAddEventModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [newEvent, setNewEvent] = useState<Omit<Event, '_id' | 'volunteers' | 'status'>>({
    title: '',
    ministry: '',
    date: '',
    time: '',
    location: '',
    maxVolunteers: 0,
    leader: '',
    description: '',
    image: ''
  });

  // Fetch events from database
  useEffect(() => {
    axios.get<Event[]>('http://localhost:3005/events')
      .then(res => setEvents(res.data))
      .catch(() => setError('فشل في جلب الفعاليات'))
      .finally(() => setLoading(false));
  }, []);

  // Add event to database
  const handleAddEvent = () => {
    setLoading(true);
    axios.post<Event>('http://localhost:3005/events', {
      ...newEvent,
      volunteers: 0,
      status: 'active'
    })
      .then(res => {
        setEvents(prev => [...prev, res.data]);
        setNewEvent({ title: '', ministry: '', date: '', time: '', location: '', maxVolunteers: 0, leader: '', description: '', image: '' });
        setShowAddEventModal(false);
        setError(null);
      })
      .catch(() => setError('فشل في إضافة الفعالية'))
      .finally(() => setLoading(false));
  };

  // Delete event from database
  const handleDeleteEvent = (_id: string) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه الفعالية؟')) return;
    axios.delete(`http://localhost:3005/events/${_id}`)
      .then(() => setEvents(prev => prev.filter(e => e._id !== _id)))
      .catch(() => setError('فشل في حذف الفعالية'));
  };

  // Handle file selection and convert to base64
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewEvent(prev => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  
  const filteredEvents = events.filter(event => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.ministry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || event.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center py-8">{error}</div>;
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">إدارة الفعاليات</h1>
          <p className="text-gray-600">إدارة وتنظيم الفعاليات التطوعية</p>
        </div>
        <div className="flex items-center rtl:space-x-reverse space-x-4">
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
              placeholder="البحث في الفعاليات..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center rtl:space-x-reverse space-x-4">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">جميع الفعاليات</option>
              <option value="active">نشطة</option>
              <option value="completed">مكتملة</option>
              <option value="cancelled">ملغاة</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <div key={event._id} className="event-card bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="event-image relative h-48 mb-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                  {event.status}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-sm text-purple-600 mb-3">{event.ministry}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarIcon className="w-4 h-4 ml-2" />
                    <span>{new Date(event.date).toLocaleDateString('ar-EG')}</span>
                    <Clock className="w-4 h-4 mr-4 ml-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 ml-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 ml-2" />
                    <span>القائد: {event.leader}</span>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>المتطوعون</span>
                    <span>{event.volunteers}/{event.maxVolunteers}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-purple-500"
                      style={{ width: `${(event.volunteers / event.maxVolunteers) * 100}%` }}
                    />
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex rtl:space-x-reverse space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onEventSelect(event);
                        onNavigate('edit-event');
                      }}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 ml-1" />
                    <span>+{event.volunteers} متطوع</span>
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
              <thead className="bg-gradient-to-r from-purple-50 to-blue-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">الصورة</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">الفعالية</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">التاريخ</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">الوقت</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">الموقع</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">المتطوعون</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">القائد</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEvents.map(event => (
                  <tr key={event._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{event.title}</div>
                      <div className="text-sm text-purple-600">{event.ministry}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">{new Date(event.date).toLocaleDateString('ar-EG')}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{event.time}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 ml-2" />
                      {event.location}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex rtl:space-x-reverse space-x-2 items-center">
                        <span className="text-sm font-medium text-gray-800">
                          {event.volunteers}/{event.maxVolunteers}
                        </span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-purple-500"
                            style={{ width: `${(event.volunteers / event.maxVolunteers) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 flex items-center">
                      <User className="w-4 h-4 ml-2" />
                      {event.leader}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex rtl:space-x-reverse space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            onEventSelect(event);
                            onNavigate('events');
                          }}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event._id)}
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
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <CalendarIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">لا توجد فعاليات</h3>
          <p className="text-gray-500 mb-6">ابدأ بإضافة فعالية جديدة</p>
          <button
            onClick={() => setShowAddEventModal(true)}
            className="btn-primary"
          >
            إضافة فعالية جديدة
          </button>
        </div>
      )}

      {/* Floating Add Button */}
      <button
        onClick={() => setShowAddEventModal(true)}
        className="floating-add-btn"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* Add Event  */}
      {showAddEventModal && (
        <AddEventModal
          onClose={() => setShowAddEventModal(false)}
          onAdd={handleAddEvent}
        />
      )}
    </div>
  );
};

export default Events;
