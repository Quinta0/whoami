import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // three gets its own chunk so editing the scene doesn't bust its cache; it can't shrink further, so no size warning for it
    chunkSizeWarningLimit: 700,
    rolldownOptions: { output: { codeSplitting: { groups: [{ name: 'three', test: /node_modules[\\/]three/ }] } } },
  },
})
