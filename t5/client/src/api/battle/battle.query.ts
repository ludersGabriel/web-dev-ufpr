import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { Pokemon } from '../pokemon/pokemon.query'
import { useAuth } from '@/auth'
import { baseUrl } from '../config'

export type PokemonBattle = {
  id: number
  pokemon_id: number
  battle_id: number
  pokemon: Pokemon
}

export type Battle = {
  id: number
  location: string
  pokemon_battle: PokemonBattle[]
}

export function useBattlesWithPokemon() {
  useQueryClient()
  const { token } = useAuth()

  return useQuery<Battle[]>({
    queryKey: ['battles-with-pokemons', token],
    queryFn: async () => {
      const response = await fetch(
        `${baseUrl}/battles/with_pokemons`,
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
    enabled: !!token,
  })
}
