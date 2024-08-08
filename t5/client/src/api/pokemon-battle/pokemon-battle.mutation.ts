import { useAuth } from '@/auth'
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { baseUrl } from '../config'
import { PokemonBattleForm } from '@/components/pokemon-battles/create-modal'

export function usePokemonBattleDelete() {
  const auth = useAuth()
  const client = useQueryClient()

  return useMutation({
    mutationKey: ['pokemon-battle-delete', auth.token],
    mutationFn: async (id: number) => {
      const resp = await fetch(
        `${baseUrl}/pokemon_battles/${id}`,
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
        queryKey: ['battles-with-pokemons', auth.token],
      })
    },
  })
}

export function usePokemonBattleCreate() {
  const auth = useAuth()
  const client = useQueryClient()

  return useMutation({
    mutationKey: ['pokemon-battle-create', auth.token],
    mutationFn: async (data: PokemonBattleForm) => {
      const resp = await fetch(
        `${baseUrl}/pokemon_battles`,
        {
          method: 'POST',
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
