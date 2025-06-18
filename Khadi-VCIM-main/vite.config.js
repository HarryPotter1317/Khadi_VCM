import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic',
    babel: {
      plugins: ['babel-plugin-react-compiler']
    }
  })],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-big-calendar',
      'moment'
    ]
  }
})