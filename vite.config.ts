import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // three gets its own chunk so editing the scene doesn't bust its cache; it can't shrink further, so no size warning for it
    chunkSizeWarningLimit: 600,
    rolldownOptions: { output: { codeSplitting: { groups: [{ name: 'three', test: /node_modules[\\/]three/ }] } } },
  },
})
