import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Theme from './themes/studio'
import Theme from './themes/blueprint'
import Theme from './themes/grid'
import Theme from './themes/terminal'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme />
  </StrictMode>,
)
