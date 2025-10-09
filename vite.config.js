import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configure Vite to use the React plugin for handling JSX and fast refreshes
export default defineConfig({
  plugins: [react()],
});