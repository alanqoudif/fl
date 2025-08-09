import React from 'react';
import {
  Users,
  Calendar,
  Award,
  TrendingUp,
  Activity,
  Clock,
  MapPin,
  Star
} from 'lucide-react';
import '../styles/dashboard.css';

interface DashboardProps {
  events: any[];
  trainings: any[];
}

const Dashboard: React.FC<DashboardProps> = ({ events = [], trainings = [] }) => {
  const stats = [
    {
      label: 'إجمالي الفعاليات',
      value: events.length,
      icon: Calendar,
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      label: 'فعاليات نشطة',
      value: events.filter(e => e.status === 'active').length,
      icon: Activity,
      gradient: 'from-green-500 to-teal-600'
    },
    {
      label: 'إجمالي المتطوعين',
      value: events.reduce((sum, e) => sum + (e.volunteers || 0), 0),
      icon: Users,
      gradient: 'from-orange-500 to-red-600'
    },
    {
      label: 'برامج التدريب',
      value: trainings.length,
      icon: Award,
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  const recentEvents = events.slice(0, 3);
  const upcomingTrainings = trainings.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="dashboard-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">مرحباً بك في لوحة التحكم</h1>
            <p className="text-purple-100 text-lg">نظرة شاملة على الفعاليات والتدريب</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{new Date().toLocaleDateString('ar-SA')}</div>
            <div className="text-purple-200">{new Date().toLocaleDateString('ar-SA', { weekday: 'long' })}</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`stats-card bg-gradient-to-br ${stat.gradient} text-white p-6 rounded-2xl`}>
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8 text-white opacity-80" />
                <div className="text-3xl font-bold">{stat.value}</div>
              </div>
              <div className="text-white opacity-90 font-medium">{stat.label}</div>
              <div className="mt-3 flex items-center text-sm text-white opacity-75">
                <TrendingUp className="w-4 h-4 ml-1" />
                <span>+12% من الشهر الماضي</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Events */}
        <div className="chart-container">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">الفعاليات الأخيرة</h3>
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <div className="space-y-4">
            {recentEvents.length > 0 ? recentEvents.map((event, index) => (
              <div key={index} className="flex items-center space-x-4 rtl:space-x-reverse p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-r-4 border-purple-500">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{event.title}</div>
                  <div className="text-sm text-gray-600 flex items-center space-x-2 rtl:space-x-reverse">
                    <Clock className="w-4 h-4" />
                    <span>{event.date}</span>
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="text-sm text-purple-600 font-medium">
                  {event.volunteers || 0}/{event.maxVolunteers} متطوع
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>لا توجد فعاليات حالياً</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Trainings */}
        <div className="chart-container">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">التدريبات القادمة</h3>
            <Award className="w-6 h-6 text-orange-600" />
          </div>
          <div className="space-y-4">
            {upcomingTrainings.length > 0 ? upcomingTrainings.map((training, index) => (
              <div key={index} className="flex items-center space-x-4 rtl:space-x-reverse p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border-r-4 border-orange-500">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{training.title}</div>
                  <div className="text-sm text-gray-600 flex items-center space-x-2 rtl:space-x-reverse">
                    <Clock className="w-4 h-4" />
                    <span>{training.date}</span>
                    <span className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Star className="w-4 h-4" />
                      <span>{training.level}</span>
                    </span>
                  </div>
                </div>
                <div className="text-sm text-orange-600 font-medium">
                  {training.duration || '3 ساعات'}
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-gray-500">
                <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>لا توجد تدريبات مجدولة</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;