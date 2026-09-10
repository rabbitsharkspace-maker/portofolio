import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './playful.css'
import './desk-body.css'
import './gallery.css'
import './world.css'
import App from './App.jsx'
import { LangProvider } from './lang.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
)
