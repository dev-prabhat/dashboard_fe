import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from 'tailwindcss'
// import daisyui from 'daisyui'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css:{
    postcss:{
      plugins: [tailwindcss()],
    }
  }
})