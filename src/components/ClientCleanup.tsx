'use client'

import { useEffect } from 'react'

export default function ClientCleanup() {
  useEffect(() => {
    try {
      const attrs = [
        'data-new-gr-c-s-check-loaded',
        'data-gr-ext-installed',
        'data-gramm',
        'data-gramm_id'
      ]

      const removeAttrs = (el: Element | null) => {
        if (!el) return
        attrs.forEach((a) => el.removeAttribute(a))
      }

      removeAttrs(document.body)
      removeAttrs(document.documentElement)
    } catch (e) {
      // non-critical cleanup failure, ignore
      // console.debug('ClientCleanup error', e)
    }
  }, [])

  return null
}
