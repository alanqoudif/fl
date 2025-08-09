import React, { useState } from 'react';

interface AdminProps {
  onNavigate: (page: string) => void;
  events: any[];
  onEventSelect: (event: any) => void;
}

const Admin: React.FC<AdminProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === 'admin@example.com' && password === 'admin123') {
      setError('');
      onNavigate('dashboard');
    } else {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <label className="block mb-2">البريد الإلكتروني</label>
        <input
          type="email"
          className="w-full px-3 py-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@example.com"
        />

        <label className="block mb-2">كلمة المرور</label>
        <input
          type="password"
          className="w-full px-3 py-2 mb-6 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          دخول
        </button>
      </form>
    </div>
  );
};

export default Admin;
