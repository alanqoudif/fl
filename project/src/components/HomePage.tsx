import React from 'react';
import { Calendar, Users, MapPin, Clock, User, ChevronLeft, Heart, Flag, Timer, Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onEventSelect: (event: any) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onEventSelect }) => {
  const featuredEvents = [
    {
      id: 1,
      title: 'بطولة السباحة الوطنية',
      ministry: 'وزارة الثقافة والرياضة والشباب',
      date: '2025-01-25',
      time: '08:00 صباحاً',
      location: 'مجمع السباحة الأولمبي - مسقط',
      volunteers: 45,
      maxVolunteers: 100,
      leader: 'أحمد بن سالم المنذري',
      description: 'ساعد في تنظيم بطولة السباحة الوطنية وإدارة المسابقات المختلفة',
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      title: 'مباراة المنتخب الوطني',
      ministry: 'وزارة الثقافة والرياضة والشباب',
      date: '2025-01-30',
      time: '06:00 مساءً',
      location: 'استاد السلطان قابوس الرياضي',
      volunteers: 28,
      maxVolunteers: 80,
      leader: 'فاطمة بنت خالد البلوشية',
      description: 'انضم لفريق تنظيم مباراة المنتخب الوطني وساعد في إدارة التذاكر والجماهير',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      title: 'بطولة كرة القدم الشبابية',
      ministry: 'وزارة الثقافة والرياضة والشباب',
      date: '2025-02-05',
      time: '04:00 عصراً',
      location: 'المجمع الرياضي - صلالة',
      volunteers: 35,
      maxVolunteers: 60,
      leader: 'محمد بن يوسف الحراصي',
      description: 'انضم كمتطوع في تنظيم البطولة الشبابية وساعد في إنجاح الفعالية',
      image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const stats = [
    { label: 'متطوع رياضي', value: '2,847', color: 'text-blue-600', icon: Heart },
    { label: 'فعالية رياضية', value: '156', color: 'text-green-600', icon: Flag },
    { label: 'ساعة تطوع', value: '12,450', color: 'text-red-600', icon: Timer },
    { label: 'رياضة مختلفة', value: '12', color: 'text-purple-600', icon: Dumbbell }
  ];

  return (
    <div className="py-8">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            منصة المتطوعين الرياضيين
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            انضم إلى مجتمع المتطوعين الرياضيين في سلطنة عمان وساهم في دعم الرياضة العمانية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('register')}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              سجل كمتطوع رياضي
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section with pulse animation on icons */}
      <section className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  className="w-14 h-14 mx-auto mb-3 flex items-center justify-center rounded-full bg-gray-100 cursor-pointer"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                >
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </motion.div>
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">الفعاليات الرياضية المميزة</h2>
          <button
            onClick={() => onNavigate('volunteers')}
            className="flex items-center space-x-2 space-x-reverse text-blue-600 hover:text-blue-700 font-medium"
          >
            <span>عرض جميع الفعاليات</span>
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {event.volunteers}/{event.maxVolunteers} متطوع
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-blue-600 font-medium mb-3 text-sm">{event.ministry}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                    <User className="w-4 h-4" />
                    <span className="text-sm">القائد: {event.leader}</span>
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
                    onClick={() => onNavigate('volunteers')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm font-medium"
                  >
                    سجل الآن
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
