import { useAuth } from '@/auth'
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { baseUrl } from '../config'
import { BattleForm } from '@/components/battles/create-modal'
import { BattleEditForm } from '@/components/battles/edit-modal'

export function useBattleDelete() {
  const auth = useAuth()
  const client = useQueryClient()

  return useMutation({
    mutationKey: ['battle', auth.token],
    mutationFn: async (id: number) => {
      const resp = await fetch(`${baseUrl}/battles/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      })

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
        queryKey: ['battles-with-pokemons', auth.token],
      })
    },
  })
}

export function useBattleCreate() {
  const auth = useAuth()
  const client = useQueryClient()

  return useMutation({
    mutationKey: ['battle', auth.token],
    mutationFn: async (data: BattleForm) => {
      const resp = await fetch(`${baseUrl}/battles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(data),
      })
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
        queryKey: ['battles-with-pokemons', auth.token],
      })
    },
  })
}

export function useBattleUpdate() {
  const auth = useAuth()
  const client = useQueryClient()

  return useMutation({
    mutationKey: ['battle-update', auth.token],
    mutationFn: async (data: BattleEditForm) => {
      const resp = await fetch(
        `${baseUrl}/battles/${data.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify(data),
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
        queryKey: ['battles-with-pokemons', auth.token],
      })
    },
  })
}
