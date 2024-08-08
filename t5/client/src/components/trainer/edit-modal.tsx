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

import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { useTrainerUpdate } from '@/api/trainer/trainer.mutation'
import toast from 'react-hot-toast'
import { Trainer } from '@/api/trainer/trainer.query'

const trainerEditSchema = z.object({
  username: z.string().min(3, 'Username is too short'),
  role: z.enum(['admin', 'user']),
  password: z.string().optional(),
  name: z.string(),
  age: z.coerce.number(),
  id: z.coerce.number(),
})

export type TrainerEditForm = z.infer<
  typeof trainerEditSchema
>

type Props = {
  propsTrainer: Trainer
}

export default function TrainerEdit({
  propsTrainer,
}: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const trainerUpdate = useTrainerUpdate()

  const form = useForm<TrainerEditForm>({
    resolver: zodResolver(trainerEditSchema),
    defaultValues: {
      ...propsTrainer,
      password: '',
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        ...propsTrainer,
        password: '',
      })
    }
  }, [open, propsTrainer, form])

  function onSubmit(data: TrainerEditForm) {
    const passData = {
      ...data,
      password: data.password ?? undefined,
    }

    trainerUpdate.mutate(passData, {
      onSuccess: () => {
        toast.success('Trainer updated')
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
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='username'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='password'
                      type='password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='name'
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
              name='age'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='age'
                      type='number'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a role' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='admin'>
                        Admin
                      </SelectItem>
                      <SelectItem value='user'>
                        User
                      </SelectItem>
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
