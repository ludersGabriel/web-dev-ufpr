import { useBattlesWithPokemon } from '@/api/battle/battle.query'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useBattleDelete } from '@/api/battle/battle.mutation'
import toast from 'react-hot-toast'
import BattleCreate from '@/components/battles/create-modal'
import BattleEdit from '@/components/battles/edit-modal'
import PokemonBattleCreate from '@/components/pokemon-battles/create-modal'
import { usePokemonBattleDelete } from '@/api/pokemon-battle/pokemon-battle.mutation'

export const Route = createFileRoute('/_auth/battles')({
  component: Battles,
})

export default function Battles() {
  const { data } = useBattlesWithPokemon()
  const { trainer } = Route.useRouteContext()
  const isAdmin = trainer.role === 'admin'

  const deleteBattle = useBattleDelete()
  const deletePokemonBattle = usePokemonBattleDelete()

  const handleDeleteBattle = (id: number) => {
    deleteBattle.mutate(id, {
      onSuccess: (data) => {
        const t = data.error ? toast.error : toast.success

        t(data.error ?? 'Battle deleted')
      },
    })
  }

  const handleDeletePokemonBattle = (id: number) => {
    deletePokemonBattle.mutate(id, {
      onSuccess: (data) => {
        const t = data.error ? toast.error : toast.success

        t(data.error ?? 'Pokemon battle deleted')
      },
    })
  }

  return (
    <div className='p-8'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-4xl font-bold text-pastel-blue'>
          Battles
        </h1>
        {isAdmin && <BattleCreate />}
      </div>
      {data?.map((battle) => (
        <div
          key={battle.id}
          className='mb-8 p-6 bg-pastel-blue-light rounded-lg shadow-lg'
        >
          <div className='flex justify-between items-center mb-4'>
            <div className='flex gap-3'>
              <h2 className='text-3xl font-bold text-pastel-blue'>
                {battle.location}
              </h2>
              <PokemonBattleCreate propsBattle={battle} />
            </div>
            {isAdmin && <BattleEdit propsBattle={battle} />}
          </div>
          <ul className='grid grid-cols-1 gap-4'>
            {battle.pokemon_battle.map((pb) => (
              <li
                key={pb.id}
                className='bg-pastel-yellow p-4 rounded-lg shadow-lg flex justify-between items-center'
              >
                <span>
                  {pb.pokemon.name} - {pb.pokemon.poke_type}{' '}
                  - Level {pb.pokemon.level}
                </span>
                {isAdmin && (
                  <div className='flex gap-2'>
                    <Button
                      className='bg-pastel-pink-dark hover:bg-pastel-pink text-white px-4 py-2 rounded'
                      onClick={() =>
                        handleDeletePokemonBattle(pb.id)
                      }
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
          {isAdmin && (
            <Button
              className='mt-4 bg-pastel-pink-dark hover:bg-pastel-pink text-white px-4 py-2 rounded'
              onClick={() => handleDeleteBattle(battle.id)}
            >
              Delete Battle
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}
