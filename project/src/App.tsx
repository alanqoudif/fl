import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from './components/Header';
import Footer from './components/Footer';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import HealthRecord from './components/HealthRecord';
import EventDetails from './components/EventDetails';
import ProfilePage from './components/ProfilePage';
import RegisterPage from './components/regesterpage';
import AllEventsPage from './components/AllEventsPage';
import SettingPage from './components/SettingPage ';
import Admin from './components/Admin';
import ChatBot from './components/chatbot';
import EditEventPage from './components/EditEventPage';
import Dashboard from './components/Dashboard';
import Events from './components/Events';
import Training from './components/Training';
import Calendar from './components/Calendar';

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

interface TrainingType {
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

interface User {
  participatedEvents: number;
  preferences: string[];
}

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedTraining, setSelectedTraining] = useState<TrainingType | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [trainings, setTrainings] = useState<TrainingType[]>([]);
  const [user] = useState<User>({ participatedEvents: 5, preferences: ['media'] });

  useEffect(() => {
    if (['volunteers', 'events', 'dashboard'].includes(currentPage)) {
      axios.get<Event[]>('http://localhost:3005/events')
        .then(res => setEvents(res.data))
        .catch(err => console.error('Error fetching events:', err));
    }
    if (['training', 'dashboard'].includes(currentPage)) {
      axios.get<TrainingType[]>('http://localhost:3005/trainings')
        .then(res => setTrainings(res.data))
        .catch(err => console.error('Error fetching trainings:', err));
    }
  }, [currentPage]);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigation}
            onEventSelect={e => { setSelectedEvent(e); handleNavigation('event-details'); }}
          />
        );
      case 'register':
        return (
          <RegisterPage
            onBack={() => handleNavigation('home')}
            onSubmit={() => handleNavigation('home')}
          />
        );
    
      case 'edit-event':
        return selectedEvent && (
          <EditEventPage
            event={selectedEvent}
            onBack={() => handleNavigation('events')}
          />
        );
      case 'health':
        return <HealthRecord onNavigate={handleNavigation} />;
      case 'event-details':
        return selectedEvent && (
          <EventDetails
            event={selectedEvent}
            onNavigate={handleNavigation}
          />
        );
      case 'profile':
        return <ProfilePage onNavigate={handleNavigation} />;
      case 'training':
        return (
          <Training
            onNavigate={handleNavigation}
            user={user}
            trainings={trainings}
            onTrainingSelect={setSelectedTraining}
          />
        );
      case 'volunteers':
        return (
          <AllEventsPage
            events={events}
            onNavigate={handleNavigation}
            onEventSelect={e => { setSelectedEvent(e); handleNavigation('event-details'); }}
          />
        );
      case 'setting':
        return <SettingPage onNavigate={handleNavigation} />;
      case 'admin':
        return (
          <Admin
            onNavigate={handleNavigation}
            events={events}
            onEventSelect={e => { setSelectedEvent(e); handleNavigation('event-details'); }}
          />
        );
      case 'chatbot':
        return <ChatBot />;
      case 'dashboard':
        return <Dashboard events={events} trainings={trainings} />;
      case 'events':
        return (
          <Events
            onNavigate={handleNavigation}
            onEventSelect={e => { setSelectedEvent(e); handleNavigation('event-details'); }}
          />
        );
      case 'calendar':
        return <Calendar />;
      default:
        return (
          <HomePage
            onNavigate={handleNavigation}
            onEventSelect={e => { setSelectedEvent(e); handleNavigation('event-details'); }}
          />
        );
    }
  };

  // Sidebar (Layout) يظهر فقط بعد تسجيل الدخول
  const layoutPages = ['dashboard', 'events', 'training', 'calendar'];
  const useLayout = layoutPages.includes(currentPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50" dir="rtl">
      {useLayout ? (
        <Layout currentPage={currentPage} onNavigate={handleNavigation}>
          {renderPage()}
        </Layout>
      ) : (
        <>
          <Header currentPage={currentPage} onNavigate={handleNavigation} />
          <main className="min-h-screen">{renderPage()}</main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
