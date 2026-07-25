import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Vite ignores $PORT on its own; honouring it lets a second session run its
  // own dev server instead of colliding on 5173.
  server: { port: Number(process.env.PORT) || 5173 },
})
