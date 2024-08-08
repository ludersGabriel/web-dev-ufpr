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

import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Pokemon } from '@/api/pokemon/pokemon.query'
import { usePokemonUpdate } from '@/api/pokemon/pokemon.mutation'

const pokemonEditSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  poke_type: z.string(),
  level: z.coerce.number(),
})

export type PokemonEditForm = z.infer<
  typeof pokemonEditSchema
>

type Props = {
  propsPokemon: Pokemon
}

export default function PokemonEdit({
  propsPokemon,
}: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const pokemonUpdate = usePokemonUpdate()

  const form = useForm<PokemonEditForm>({
    resolver: zodResolver(pokemonEditSchema),
    defaultValues: {
      ...propsPokemon,
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        ...propsPokemon,
      })
    }
  }, [open, propsPokemon, form])

  function onSubmit(data: PokemonEditForm) {
    pokemonUpdate.mutate(data, {
      onSuccess: () => {
        toast.success('Pokemon updated')
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
        <div>
          <Button
            className='bg-pastel-yellow-dark hover:bg-pastel-yellow text-pastel-blue-dark px-4 py-2 rounded'
            onClick={handleOpen}
          >
            Edit
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pokemon Update Form</DialogTitle>
          <DialogDescription>
            Fill out the form below to update your pokemon
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'
          >
            <FormField
              control={form.control}
              name='name'
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='poke_type'
              rules={{
                required: 'Pokemon Type is required',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pokemon Type</FormLabel>
                  <FormControl>
                    <Input placeholder='fire' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='level'
              rules={{ required: 'Level is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='bg-pastel-green-dark hover:bg-pastel-green text-pastel-yellow px-4 py-2 rounded mr-2'
            >
              Update
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
