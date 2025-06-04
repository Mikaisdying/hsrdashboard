const BASE_URL = ''
const TIMEOUT = 10000

function resolveUrlWithParams(url: string, pathParams?: Record<string, string | number>) {
  if (!pathParams) return url
  return url.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => pathParams[key]?.toString() || '')
}

export interface IApiRequestParams<P = any, Q = any, B = any> {
  path?: P
  query?: Q
  body?: B
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  responseType?: 'json' | 'blob' | 'text'
  headers?: Record<string, string>
}

function buildQueryString(query?: Record<string, any>): string {
  if (!query) return ''
  const params = new URLSearchParams()
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value.toString())
    }
  })
  const qs = params.toString()
  return qs ? `?${qs}` : ''
}

export async function apiService<T = any>(
  params: {
    url: string
  } & IApiRequestParams
): Promise<T> {
  const { url, path, query, body, method = 'GET', responseType = 'json', headers } = params

  const resolvedUrl = resolveUrlWithParams(url, path)
  const queryString = buildQueryString(query)
  const fullUrl = `${BASE_URL}${resolvedUrl}${queryString}`

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT)

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    signal: controller.signal,
  }

  if (body && method !== 'GET') {
    fetchOptions.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(fullUrl, fetchOptions)
    clearTimeout(timeoutId)
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`)
    }
    if (responseType === 'blob') return (await response.blob()) as any
    if (responseType === 'text') return (await response.text()) as any
    return (await response.json()) as T
  } catch (error: any) {
    console.error('API Error:', error)
    throw error
  }
}
