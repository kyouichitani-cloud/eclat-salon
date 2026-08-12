import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Vercel serves this app from the domain root. A repository-name base
  // makes the generated JS/CSS URLs point to a non-existent subdirectory.
  base: '/',
  plugins: [react()],
})
