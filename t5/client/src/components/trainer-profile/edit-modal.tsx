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
import { TrainerProfile } from '@/api/trainer-profile/trainer-profile.query'
import { useTrainerProfileUpdate } from '@/api/trainer-profile/trainer-profile.mutation'

const trainerProfileEditSchema = z.object({
  id: z.coerce.number(),
  hometown: z.string(),
  favorite_pokemon: z.string(),
})

export type TrainerProfileEditForm = z.infer<
  typeof trainerProfileEditSchema
>

type Props = {
  propsProfile: TrainerProfile
}

export default function TrainerProfileEdit({
  propsProfile,
}: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const trainerProfileUpdate = useTrainerProfileUpdate()

  const form = useForm<TrainerProfileEditForm>({
    resolver: zodResolver(trainerProfileEditSchema),
    defaultValues: {
      ...propsProfile,
    },
  })

  function onSubmit(data: TrainerProfileEditForm) {
    trainerProfileUpdate.mutate(data, {
      onSuccess: () => {
        toast.success('Trainer profile updated')
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
          <DialogTitle>Trainer Update Form</DialogTitle>
          <DialogDescription>
            Fill out the form below to update your trainer
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
                  <FormLabel>Home Town</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='home town'
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
                      placeholder='favorite pokemon'
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
