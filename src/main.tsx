import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Theme from './themes/blueprint'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme />
  </StrictMode>,
)
