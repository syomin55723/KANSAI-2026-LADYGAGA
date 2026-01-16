import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 您的 GitHub Repository 名稱是 KANSAI-2026-LADYGAGA
  // 這個路徑大小寫必須完全吻合
  base: '/KANSAI-2026-LADYGAGA/', 
  build: {
    outDir: 'dist',
  }
});