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
import { useState } from 'react'
import toast from 'react-hot-toast'

import { Trainer } from '@/api/trainer/trainer.query'
import { usePokemonCreate } from '@/api/pokemon/pokemon.mutation'

const pokemonCreateSchema = z.object({
  name: z.string(),
  poke_type: z.string(),
  level: z.coerce.number(),
  trainer_id: z.coerce.number(),
})

export type PokemonForm = z.infer<
  typeof pokemonCreateSchema
>

export type Props = {
  propsTrainer: Trainer
}

export default function PokemonCreate({
  propsTrainer,
}: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const pokemonCreate = usePokemonCreate()

  const form = useForm<PokemonForm>({
    resolver: zodResolver(pokemonCreateSchema),
    defaultValues: {
      trainer_id: propsTrainer.id,
      name: '',
      poke_type: '',
      level: 1,
    },
  })

  function onSubmit(data: PokemonForm) {
    pokemonCreate.mutate(data, {
      onSuccess: () => {
        toast.success('Pokemon created')
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
        <div className='flex justify-center'>
          <Button
            className='bg-pastel-green-dark hover:bg-pastel-green text-pastel-yellow px-4 py-2 rounded'
            onClick={handleOpen}
          >
            Add Pokemon
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pokemon Creation Form</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new pokemon
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
