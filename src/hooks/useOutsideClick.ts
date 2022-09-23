import { RefObject, useEffect } from 'react'
import { useEvent } from './useEvent'

export const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: (e: MouseEvent) => void
) => {
  const memedCallback = useEvent(callback)

  useEffect(() => {
    const eventHandler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as HTMLElement)) {
        memedCallback(e)
      }
    }

    document.addEventListener('click', eventHandler)

    return () => {
      document.removeEventListener('click', eventHandler)
    }
  }, [memedCallback, ref])
}
