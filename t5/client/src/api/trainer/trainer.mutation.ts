import { useAuth } from '@/auth'
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { baseUrl } from '../config'
import { TrainerForm } from '@/components/trainer/create-modal'
import { TrainerEditForm } from '@/components/trainer/edit-modal'

export function useTrainerDelete() {
  const auth = useAuth()
  const client = useQueryClient()

  return useMutation({
    mutationKey: ['trainer-delete', auth.token],
    mutationFn: async (id: number) => {
      const resp = await fetch(
        `${baseUrl}/trainers/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        }
      )

      client.invalidateQueries({
        queryKey: ['trainers', auth.token],
      })

      return resp.json()
    },
  })
}

export function useTrainerCreate() {
  const auth = useAuth()
  const client = useQueryClient()

  return useMutation({
    mutationKey: ['trainer-create', auth.token],
    mutationFn: async (data: TrainerForm) => {
      const resp = await fetch(`${baseUrl}/trainers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          trainer: data,
        }),
      })

      if (!resp.ok) {
        const errorData = await resp.json()
        throw new Error(
          errorData.error || 'An error occurred'
        )
      }

      const responseData = await resp.json()
      return responseData
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['trainers', auth.token],
      })
    },
  })
}

export function useTrainerUpdate() {
  const auth = useAuth()
  const client = useQueryClient()

  return useMutation({
    mutationKey: ['trainer-update', auth.token],
    mutationFn: async (data: TrainerEditForm) => {
      const resp = await fetch(
        `${baseUrl}/trainers/${data.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            trainer: data,
          }),
        }
      )

      if (!resp.ok) {
        const errorData = await resp.json()
        throw new Error(
          errorData.error || 'An error occurred'
        )
      }

      const responseData = await resp.json()
      return responseData
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['trainers', auth.token],
      })
    },
  })
}
