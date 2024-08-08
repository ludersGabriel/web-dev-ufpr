import { useAuth } from '@/auth'
import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { baseUrl } from '../config'

export type TrainerProfile = {
  hometown: string
  favorite_pokemon: string
  trainer_id: number
  id: number
}

export function useTrainerProfile() {
  useQueryClient()
  const { token } = useAuth()

  return useQuery<TrainerProfile>({
    queryKey: ['trainer-profile', token],
    queryFn: async () => {
      const response = await fetch(
        `${baseUrl}/trainer_profiles/by_trainer`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    enabled: !!token, // Only run the query if token is available
  })
}

export function useTrainerProfiles() {
  useQueryClient()
  const { token } = useAuth()

  return useQuery<TrainerProfile[]>({
    queryKey: ['trainer-profiles', token],
    queryFn: async () => {
      const response = await fetch(
        `${baseUrl}/trainer_profiles`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    enabled: !!token, // Only run the query if token is available
  })
}
