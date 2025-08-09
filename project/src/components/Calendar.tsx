import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Plus,
  Clock,
  MapPin,
  Users
} from 'lucide-react';
import '../styles/calendar.css';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'event' | 'training';
  location: string;
  participants: number;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Mock events data
  useEffect(() => {
    setEvents([
      {
        id: '1',
        title: 'مهرجان الثقافة والتراث',
        date: '2024-12-20',
        time: '09:00',
        type: 'event',
        location: 'المركز الثقافي',
        participants: 25
      },
      {
        id: '2',
        title: 'دورة إدارة الفعاليات',
        date: '2024-12-15',
        time: '14:00',
        type: 'training',
        location: 'قاعة التدريب',
        participants: 20
      },
      {
        id: '3',
        title: 'حملة تنظيف الشواطئ',
        date: '2024-12-25',
        time: '07:00',
        type: 'event',
        location: 'شاطئ القرم',
        participants: 15
      }
    ]);
  }, []);

  const monthNames = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  const dayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  // Generate calendar days
  const days = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const cells: (Date | null)[] = [];
    for (let i = 0; i < firstDay.getDay(); i++) {
      cells.push(null);
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      cells.push(new Date(year, month, i));
    }
    return cells;
  }, [currentDate]);

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    const key = date.toISOString().split('T')[0];
    return events.filter(e => e.date === key);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'prev' ? -1 : 1));
      return newDate;
    });
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const hasEvents = (date: Date | null) => getEventsForDate(date).length > 0;

  const monthEvents = useMemo(() => {
    return events.filter(e => {
      const d = new Date(e.date);
      return (
        d.getMonth() === currentDate.getMonth() &&
        d.getFullYear() === currentDate.getFullYear()
      );
    });
  }, [events, currentDate]);

  const eventCount = monthEvents.filter(e => e.type === 'event').length;
  const trainingCount = monthEvents.filter(e => e.type === 'training').length;
  const participantCount = monthEvents.reduce((sum, e) => sum + e.participants, 0);

  const selectedEvents = getEventsForDate(selectedDate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">التقويم</h1>
          <p className="text-gray-600">عرض وإدارة الفعاليات والتدريبات</p>
        </div>

        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button className="flex items-center space-x-2 rtl:space-x-reverse bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
            <Plus className="w-5 h-5" />
            <span>إضافة حدث</span>
          </button>
          <button
            onClick={() => {
              const today = new Date();
              setCurrentDate(today);
              setSelectedDate(today);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            اليوم
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="calendar-container">
            {/* Calendar Header */}
            <div className="calendar-header">
              <div className="flex items-center justify-between">
                <button onClick={() => navigateMonth('prev')} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button onClick={() => navigateMonth('next')} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 bg-gray-50">
              {dayNames.map(day => (
                <div key={day} className="p-4 text-center font-medium text-gray-700 border-b">
                  {day}
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7">
              {days.map((day, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedDate(day)}
                  className={`calendar-day ${hasEvents(day) ? 'has-event' : ''} ${isToday(day) ? 'bg-purple-100 border-purple-300' : ''} ${selectedDate?.toDateString() === day?.toDateString() ? 'bg-purple-200' : ''}`}
                >
                  {day && (
                    <>
                      <div className={`text-sm font-medium mb-2 ${isToday(day) ? 'text-purple-700' : 'text-gray-900'}`}>
                        {day.getDate()}
                      </div>
                      {getEventsForDate(day).slice(0, 2).map((ev, i) => (
                        <div key={i} className={`calendar-event ${ev.type === 'training' ? 'border-orange-500 bg-orange-50 text-orange-600' : ''}`}>
                          <div className="text-xs font-medium truncate">{ev.title}</div>
                          <div className="text-xs opacity-75">{ev.time}</div>
                        </div>
                      ))}
                      {getEventsForDate(day).length > 2 && (
                        <div className="text-xs text-purple-600 font-medium">
                          +{getEventsForDate(day).length - 2} المزيد
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {selectedEvents.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="space-y-4">
                {selectedEvents.map(ev => (
                  <div key={ev.id} className={`p-4 rounded-lg ${ev.type === 'event' ? 'bg-purple-50 border-purple-200' : 'bg-orange-50 border-orange-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-semibold ${ev.type === 'event' ? 'text-purple-800' : 'text-orange-800'}`}>{ev.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${ev.type === 'event' ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600'}`}>{ev.type === 'event' ? 'فعالية' : 'تدريب'}</span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse"><Clock className="w-4 h-4" /><span>{ev.time}</span></div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse"><MapPin className="w-4 h-4" /><span>{ev.location}</span></div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse"><Users className="w-4 h-4" /><span>{ev.participants} مشارك</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">إحصائيات سريعة</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">فعاليات هذا الشهر</span>
                <span className="font-semibold text-purple-600">{eventCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">تدريبات هذا الشهر</span>
                <span className="font-semibold text-orange-600">{trainingCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">إجمالي المشاركين</span>
                <span className="font-semibold text-green-600">{participantCount}</span>
              </div>
            </div>
          </div>
          {/* Legend */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">دليل الألوان</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 rtl:space-x-reverse"><div className="w-4 h-4 bg-purple-500 rounded"></div><span className="text-sm text-gray-600">فعاليات</span></div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse"><div className="w-4 h-4 bg-orange-500 rounded"></div><span className="text-sm text-gray-600">تدريبات</span></div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse"><div className="w-4 h-4 bg-green-500 rounded"></div><span className="text-sm text-gray-600">اليوم الحالي</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

