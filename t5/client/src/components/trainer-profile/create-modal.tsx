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
import { useTrainerProfileCreate } from '@/api/trainer-profile/trainer-profile.mutation'
import { Trainer } from '@/api/trainer/trainer.query'

const trainerProfileCreateSchema = z.object({
  trainer_id: z.coerce.number(),
  hometown: z.string(),
  favorite_pokemon: z.string(),
})

export type TrainerProfileForm = z.infer<
  typeof trainerProfileCreateSchema
>

export type Props = {
  propsTrainer: Trainer
}

export default function TrainerProfileCreate({
  propsTrainer,
}: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const trainerProfileCreate = useTrainerProfileCreate()

  const form = useForm<TrainerProfileForm>({
    resolver: zodResolver(trainerProfileCreateSchema),
    defaultValues: {
      trainer_id: propsTrainer.id,
      hometown: '',
      favorite_pokemon: '',
    },
  })

  function onSubmit(data: TrainerProfileForm) {
    trainerProfileCreate.mutate(data, {
      onSuccess: () => {
        toast.success('Trainer profile created')
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
            Add Profile
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Trainer Profile Creation Form
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new trainer
            profile
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'
          >
            <FormField
              control={form.control}
              name='hometown'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hometown</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='hometown'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='favorite_pokemon'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favorite Pokemon</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='pikachu'
                      {...field}
                    />
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
