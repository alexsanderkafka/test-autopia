import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import Login from './Pages/Login.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Login />
  </StrictMode>
)
