import React from 'react';
import { ArrowRight, Calendar, Clock, MapPin, User, Users, Heart, CheckCircle } from 'lucide-react';

interface EventDetailsProps {
  event: any;
  onNavigate: (page: string) => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onNavigate }) => {
  if (!event) {
    return (
      <div className="py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800">لم يتم العثور على الفعالية</h1>
          <button
            onClick={() => onNavigate('home')}
            className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-2 space-x-reverse text-red-600 hover:text-red-700 mb-6"
        >
          <ArrowRight className="w-5 h-5" />
          <span>العودة</span>
        </button>

        {/* Event Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-64">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                <p className="text-lg opacity-90">{event.ministry}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Calendar className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">{event.date}</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Clock className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">{event.time}</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">{event.location}</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <User className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">القائد: {event.leader}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">المتطوعون المسجلون</span>
                    <span className="text-red-600 font-bold">{event.volunteers}/{event.maxVolunteers}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-red-600 h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${(event.volunteers / event.maxVolunteers) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    متبقي {event.maxVolunteers - event.volunteers} مقعد
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Description */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">وصف الفعالية</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{event.description}</p>
        </div>

        {/* Requirements and Benefits */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Requirements */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2 space-x-reverse">
              <Heart className="w-6 h-6 text-red-500" />
              <span>المتطلبات</span>
            </h3>
            <ul className="space-y-3">
              {event.requirements?.map((req: string, index: number) => (
                <li key={index} className="flex items-start space-x-3 space-x-reverse">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2 space-x-reverse">
              <Users className="w-6 h-6 text-green-500" />
              <span>المزايا</span>
            </h3>
            <ul className="space-y-3">
              {event.benefits?.map((benefit: string, index: number) => (
                <li key={index} className="flex items-start space-x-3 space-x-reverse">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Registration Section */}
        <div className="bg-gradient-to-r from-red-600 to-green-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">هل أنت مستعد للمشاركة؟</h2>
          <p className="text-lg mb-6 opacity-90">
            انضم إلينا في هذه الفعالية المميزة وساهم في خدمة المجتمع العماني
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('volunteers')}
              className="bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              سجل في الفعالية
            </button>
            <button
              onClick={() => onNavigate('health')}
              className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-red-600 transition-all duration-300"
            >
              إكمال السجل الصحي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;