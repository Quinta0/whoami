import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Theme from './themes/arcade'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme />
  </StrictMode>,
)
