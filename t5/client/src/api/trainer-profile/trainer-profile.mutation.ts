import { useAuth } from '@/auth'
import { TrainerProfileForm } from '@/components/trainer-profile/create-modal'
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { baseUrl } from '../config'
import { TrainerProfileEditForm } from '@/components/trainer-profile/edit-modal'

export function useTrainerProfileDelete() {
  const auth = useAuth()
  const client = useQueryClient()

  return useMutation({
    mutationKey: ['trainer-profile-delete', auth.token],
    mutationFn: async (id: number) => {
      const resp = await fetch(
        `${baseUrl}/trainer_profiles/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        }
      )

      if (!resp.ok) {
        const errorData = await resp.json()
        throw new Error(
          errorData.error || 'An error occurred'
        )
      }

      return await resp.json()
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['trainer-profiles', auth.token],
      })
    },
  })
}

export function useTrainerProfileCreate() {
  const auth = useAuth()
  const client = useQueryClient()

  return useMutation({
    mutationKey: ['trainer-profile-create', auth.token],
    mutationFn: async (data: TrainerProfileForm) => {
      const resp = await fetch(
        `${baseUrl}/trainer_profiles`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            trainer_profile: data,
          }),
        }
      )

      if (!resp.ok) {
        const errorData = await resp.json()
        throw new Error(
          errorData.error || 'An error occurred'
        )
      }

      return resp.json()
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['trainer-profiles', auth.token],
      })
    },
  })
}

export function useTrainerProfileUpdate() {
  const auth = useAuth()
  const client = useQueryClient()

  return useMutation({
    mutationKey: ['trainer-profile-update', auth.token],
    mutationFn: async (data: TrainerProfileEditForm) => {
      const resp = await fetch(
        `${baseUrl}/trainer_profiles/${data.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            trainer_profile: data,
          }),
        }
      )

      if (!resp.ok) {
        const errorData = await resp.json()
        throw new Error(
          errorData.error || 'An error occurred'
        )
      }

      return resp.json()
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['trainer-profiles', auth.token],
      })
    },
  })
}
