import { useCallback, useEffect, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
export const useEvent = <T extends Function>(fn: T) => {
  const fnRef = useRef<T>()

  useEffect(() => {
    fnRef.current = fn
  }, [fn])

  return useCallback((...args: unknown[]): unknown => fnRef.current?.(...args), [])
}
