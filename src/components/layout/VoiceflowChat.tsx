'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { getConsent } from './CookieConsent'

declare global {
  interface Window {
    voiceflow?: {
      chat?: {
        load: (config: unknown) => Promise<void>
        open: () => void
        proactive: {
          clear: () => void
          push: (message: { type: string; payload: { message: string } }) => void
        }
        destroy: () => void
      }
    }
  }
}

export default function VoiceflowChat() {
  const pathname = usePathname()
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const consent = getConsent()
    setAllowed(consent?.functional === true)

    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail
      setAllowed(detail?.functional === true)
    }
    window.addEventListener('cookie-consent-update', handler)
    return () => window.removeEventListener('cookie-consent-update', handler)
  }, [])

  useEffect(() => {
    if (!allowed) return

    const existingWidget = document.getElementById('voiceflow-chat')
    if (existingWidget) {
      existingWidget.remove()
    }

    if (window.voiceflow?.chat?.destroy) {
      try {
        window.voiceflow.chat.destroy()
      } catch {
        // Ignore errors during destroy
      }
    }

    const existingScript = document.getElementById('voiceflow-widget')
    if (existingScript) {
      existingScript.remove()
    }

    delete window.voiceflow

    const script = document.createElement('script')
    script.id = 'voiceflow-widget'
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs'
    script.type = 'text/javascript'

    script.onload = () => {
      if (!window.voiceflow?.chat) return

      window.voiceflow.chat.load({
        verify: { projectID: '69b1401debe70d737b8a750c' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        voice: {
          url: 'https://runtime-api.voiceflow.com'
        },
        launch: {
          event: {
            type: 'launch',
            payload: {
              url: window.location.href
            }
          }
        }
      }).then(() => {
        const isPropertyPage = window.location.pathname.startsWith('/angebote/') &&
          window.location.pathname !== '/angebote/' &&
          window.location.pathname !== '/angebote'

        setTimeout(() => {
          if (!window.voiceflow?.chat) return
          window.voiceflow.chat.proactive.clear()
          if (isPropertyPage) {
            window.voiceflow.chat.proactive.push({
              type: 'text',
              payload: {
                message: 'Diese Immobilie könnte Ihr neues Zuhause sein! Ich beantworte alle Fragen und sende Ihnen alle Details – starten Sie jetzt! 🏡😊'
              }
            })
          } else {
            window.voiceflow.chat.proactive.push({
              type: 'text',
              payload: {
                message: 'Ich bin Ihre intelligente Assistentin Jana! Immobilien kaufen, verkaufen oder bewerten? Ich helfe Ihnen sofort – starten Sie jetzt! 🏡😊'
              }
            })
          }
        }, 1000)

        const hasOpenedThisSession = sessionStorage.getItem('chatOpenedOnce')
        const isMobile = window.innerWidth < 768

        if (!hasOpenedThisSession && !isMobile) {
          setTimeout(() => {
            if (window.voiceflow?.chat) {
              window.voiceflow.chat.open()
              sessionStorage.setItem('chatOpenedOnce', 'true')
            }
          }, 5000)
        }
      })
    }

    document.head.appendChild(script)

    return () => {
      if (window.voiceflow?.chat?.destroy) {
        try {
          window.voiceflow.chat.destroy()
        } catch {
          // Ignore errors
        }
      }
    }
  }, [pathname, allowed])

  return null
}
