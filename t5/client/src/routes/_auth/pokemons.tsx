import { usePokemonDelete } from '@/api/pokemon/pokemon.mutation'
import {
  PokemonByTrainer,
  usePokemonsByTrainers,
} from '@/api/pokemon/pokemon.query'
import { useTrainerDelete } from '@/api/trainer/trainer.mutation'
import PokemonCreate from '@/components/pokemon/create-modal'
import PokemonEdit from '@/components/pokemon/edit-modal'
import { createFileRoute } from '@tanstack/react-router'

import { toast } from 'react-hot-toast'

export const Route = createFileRoute('/_auth/pokemons')({
  component: Pokemons,
})

export default function Pokemons() {
  const { data } = usePokemonsByTrainers()
  const { trainer } = Route.useRouteContext()

  const deleteTrainer = useTrainerDelete()
  const deletePokemon = usePokemonDelete()

  const isAdmin = trainer.role === 'admin'

  const pokemons =
    data?.filter(
      (t: PokemonByTrainer) => t.id !== trainer.id
    ) ?? []
  const myPokemons =
    data?.find((t: PokemonByTrainer) => t.id === trainer.id)
      ?.pokemon ?? []

  const handleDeleteTrainer = (id: number) => {
    deleteTrainer.mutate(id, {
      onSuccess: (data) => {
        const t = data.error ? toast.error : toast.success
        t(data.error ?? 'Trainer deleted')
      },
    })
  }

  const handleDeletePokemon = (id: number) => {
    deletePokemon.mutate(id, {
      onSuccess: (data) => {
        const t = data.error ? toast.error : toast.success
        t(data.error ?? 'Pokemon deleted')
      },
    })
  }

  return (
    <div className='p-8'>
      <div className='mb-8'>
        <h2 className='text-4xl font-bold mb-4 text-pastel-blue'>
          Your Pokemons
        </h2>
        <ul className='grid grid-cols-1 gap-4'>
          {myPokemons.map((p) => (
            <li
              key={p.id}
              className='bg-pastel-yellow p-4 rounded-lg shadow-lg flex justify-between items-center'
            >
              <span>
                {p.name} - {p.poke_type} - Level {p.level}
              </span>
              {isAdmin && (
                <div className='flex gap-2'>
                  <PokemonEdit propsPokemon={p} />
                  <button
                    className='bg-pastel-pink-dark hover:bg-pastel-pink text-white px-4 py-2 rounded'
                    onClick={() =>
                      handleDeletePokemon(p.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      {pokemons.map((t: PokemonByTrainer) => (
        <div key={t.id} className='mb-8'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-3xl font-bold text-pastel-blue'>
              {t.name}'s Pokemons
            </h2>
            {isAdmin && <PokemonCreate propsTrainer={t} />}
          </div>
          <ul className='grid grid-cols-1 gap-4'>
            {t.pokemon.map((p) => (
              <li
                key={p.id}
                className='bg-pastel-yellow p-4 rounded-lg shadow-lg flex justify-between items-center'
              >
                <span>
                  {p.name} - {p.poke_type} - Level {p.level}
                </span>
                {isAdmin && (
                  <div className='flex gap-2'>
                    <PokemonEdit propsPokemon={p} />
                    <button
                      className='bg-pastel-pink-dark hover:bg-pastel-pink text-white px-4 py-2 rounded'
                      onClick={() =>
                        handleDeletePokemon(p.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
          {isAdmin && (
            <button
              className='mt-4 bg-pastel-pink-dark hover:bg-pastel-pink text-white px-4 py-2 rounded'
              onClick={() => handleDeleteTrainer(t.id)}
            >
              Delete Trainer
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
