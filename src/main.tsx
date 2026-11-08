import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Remix from './Remix'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Remix />
  </StrictMode>,
)
