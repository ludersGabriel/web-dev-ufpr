import {
  queryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { baseUrl } from '../config'
import { useAuth } from '@/auth'

export type Trainer = {
  id: number
  username: string
  name: string
  role: string
}

export function useTrainer(token: string) {
  useQueryClient()

  const query = useQuery({
    queryKey: ['trainer', token],
    queryFn: () => {
      return fetch(`${baseUrl}/trainer`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    },
    enabled: !!token,
  })

  if (!token) {
    return {
      isPending: false,
      isFetching: false,
      user: null,
      error: null,
    }
  }

  return {
    isPending: query.isPending,
    isFetching: query.isFetching,
    user: query.data?.user as Trainer | null,
    error: query.error,
  }
}

export const trainerQueryOptions = queryOptions({
  queryKey: ['trainer-query'],
  queryFn: me,
  staleTime: Infinity,
})

async function me(): Promise<{ trainer: Trainer }> {
  const token = localStorage.getItem('token')

  if (!token) throw new Error('No token found')

  const res = await fetch(`${baseUrl}/trainer`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) throw new Error('Failed to fetch user')

  return await res.json()
}

export function useTrainers() {
  useQueryClient()
  const { token } = useAuth()

  return useQuery<Trainer[]>({
    queryKey: ['trainers', token],
    queryFn: () => {
      return fetch(`${baseUrl}/trainers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    },
  })
}
