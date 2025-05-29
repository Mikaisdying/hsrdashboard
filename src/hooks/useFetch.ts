import { useState, useEffect } from 'react'

interface UseFetchResult<T> {
  data: T | null
  loading: boolean
  error: any
}

export function useFetch<T>(fetcher: () => Promise<T>, deps: any[] = []): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetcher()
      .then((res) => setData(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, deps)

  return { data, loading, error }
}
