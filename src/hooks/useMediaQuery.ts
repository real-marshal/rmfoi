import { useCallback, useEffect, useState } from 'react'

export const useMediaQuery = (mediaQuery: string) => {
  const [isMatch, setIsMatch] = useState(false)

  const eventHandler = useCallback((e: MediaQueryListEvent) => setIsMatch(e.matches), [])

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery)
    setIsMatch(mediaQueryList.matches)

    mediaQueryList.addEventListener('change', eventHandler)

    return () => mediaQueryList.removeEventListener('change', eventHandler)
  }, [mediaQuery, eventHandler])

  return isMatch
}
