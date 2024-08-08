import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useState } from 'react'

import { usePokemons } from '@/api/pokemon/pokemon.query'
import toast from 'react-hot-toast'
import { usePokemonBattleCreate } from '@/api/pokemon-battle/pokemon-battle.mutation'
import { Battle } from '@/api/battle/battle.query'

const pokemonBattleCreateSchema = z.object({
  pokemon_id: z.coerce.number(),
  battle_id: z.coerce.number(),
})

export type PokemonBattleForm = z.infer<
  typeof pokemonBattleCreateSchema
>

type Props = {
  propsBattle: Battle
}

export default function PokemonBattleCreate({
  propsBattle,
}: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const pokemonBattleCreate = usePokemonBattleCreate()
  const { data: pokemons } = usePokemons()

  const form = useForm<PokemonBattleForm>({
    resolver: zodResolver(pokemonBattleCreateSchema),
    defaultValues: {
      battle_id: propsBattle.id,
      pokemon_id: 0,
    },
  })

  function onSubmit(data: PokemonBattleForm) {
    pokemonBattleCreate.mutate(data, {
      onSuccess: () => {
        toast.success('Pokémon battle created')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })

    handleOpen()
  }

  function resetForm() {
    form.reset()
    form.clearErrors()
  }

  function handleOpen() {
    setOpen(!open)
    resetForm()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <div className='flex justify-center '>
          <Button
            className='bg-pastel-green-dark hover:bg-pastel-green text-pastel-yellow px-4 py-2 rounded mr-2'
            onClick={handleOpen}
          >
            Create Pokémon Battle
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Pokémon Battle Creation Form
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new Pokémon
            battle
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'
          >
            <FormField
              control={form.control}
              name='pokemon_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Pokémon</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a Pokémon' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {pokemons?.map((pokemon) => (
                        <SelectItem
                          key={pokemon.id}
                          value={pokemon.id.toString()}
                        >
                          {pokemon.name +
                            ' - ' +
                            pokemon.poke_type +
                            ' - Level ' +
                            pokemon.level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='bg-pastel-green-dark hover:bg-pastel-green text-pastel-yellow px-4 py-2 rounded mr-2'
            >
              Create
            </Button>
            <DialogClose asChild onClick={resetForm}>
              <Button type='button' variant='destructive'>
                Cancel
              </Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
