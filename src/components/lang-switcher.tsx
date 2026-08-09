import { useState, useRef, useEffect } from 'react'
import { useLang } from '../i18n/lang-context'
import { LANGS } from '../i18n/translations'

export default function LangSwitcher() {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [open])

  return (
    <div className="lang-switch" ref={ref}>
      <button className="lang-switch-btn" onClick={() => setOpen(o => !o)} aria-haspopup="listbox" aria-expanded={open} title="Language">
        {lang.toUpperCase()}
      </button>
      {open && (
        <div className="lang-switch-menu" role="listbox">
          {LANGS.map(l => (
            <button
              key={l.code}
              className={`lang-switch-opt${l.code === lang ? ' active' : ''}`}
              role="option"
              aria-selected={l.code === lang}
              onClick={() => { setLang(l.code); setOpen(false) }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
