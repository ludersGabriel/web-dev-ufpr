import { useAuth } from '@/auth'
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { baseUrl } from '../config'
import { PokemonEditForm } from '@/components/pokemon/edit-modal'
import { PokemonForm } from '@/components/pokemon/create-modal'

export function usePokemonDelete() {
  const auth = useAuth()
  const client = useQueryClient()

  return useMutation({
    mutationKey: ['pokemon-delete', auth.token],
    mutationFn: async (id: number) => {
      const resp = await fetch(
        `${baseUrl}/pokemons/${id}`,
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
        queryKey: ['pokemons-by-trainers', auth.token],
      })
    },
  })
}

export function usePokemonCreate() {
  const auth = useAuth()
  const client = useQueryClient()

  return useMutation({
    mutationKey: ['pokemon-create', auth.token],
    mutationFn: async (data: PokemonForm) => {
      const resp = await fetch(`${baseUrl}/pokemons`, {
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
        queryKey: ['pokemons-by-trainers', auth.token],
      })
    },
  })
}

export function usePokemonUpdate() {
  const auth = useAuth()
  const client = useQueryClient()

  return useMutation({
    mutationKey: ['pokemon-update', auth.token],
    mutationFn: async (data: PokemonEditForm) => {
      const resp = await fetch(
        `${baseUrl}/pokemons/${data.id}`,
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
        queryKey: ['pokemons-by-trainers', auth.token],
      })
    },
  })
}
