import { useAuth } from '@/auth'
import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { Trainer } from '../trainer/trainer.query'
import { baseUrl } from '../config'

export type Pokemon = {
  id: number
  name: string
  poke_type: string
  level: number
  trainer_id: number
}

export type PokemonByTrainer = Trainer & {
  pokemon: Pokemon[]
}

export function usePokemonsByTrainers() {
  useQueryClient()
  const { token } = useAuth()

  return useQuery<PokemonByTrainer[]>({
    queryKey: ['pokemons-by-trainers', token],
    queryFn: async () => {
      const response = await fetch(
        `${baseUrl}/pokemons/by_trainer`,
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
