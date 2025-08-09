// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      // يوجّه كل الطلبات التي تبدأ بـ /MinistryDashboard
      '/MinistryDashboard': {
        target: 'http://localhost:3005',
        changeOrigin: true,
        secure: false,
      },
    }
  }
});
