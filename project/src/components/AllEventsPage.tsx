// components/AllEventsPage.tsx
import React from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

interface Event {
  _id: string;
  title: string;
  ministry: string;
  date: string;
  time: string;
  location: string;
  leader: string;
  image: string;
}

interface AllEventsPageProps {
  events: Event[];
  onNavigate: (page: string) => void;
  onEventSelect: (event: Event) => void;
}

const AllEventsPage: React.FC<AllEventsPageProps> = ({ events, onNavigate, onEventSelect }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">جميع الفعاليات الرياضية</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div
            key={event._id} // ✅ المفتاح الفريد الصحيح
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-transform hover:scale-105"
          >
            <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
              <p className="text-blue-600 font-medium mb-3 text-sm">{event.ministry}</p>

              <div className="space-y-1 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <User className="w-4 h-4" />
                  <span>القائد: {event.leader}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    onEventSelect(event);
                    onNavigate('event-details');
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  عرض التفاصيل
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm font-medium"
                >
                  سجل الآن
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEventsPage;
