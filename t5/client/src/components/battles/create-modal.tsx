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

import { useBattleCreate } from '@/api/battle/battle.mutation'

const battleCreateSchema = z.object({
  location: z.string(),
})

export type BattleForm = z.infer<typeof battleCreateSchema>

export default function BattleCreate() {
  const [open, setOpen] = useState<boolean>(false)
  const battleCreate = useBattleCreate()

  const form = useForm<BattleForm>({
    resolver: zodResolver(battleCreateSchema),
    defaultValues: {
      location: '',
    },
  })

  function onSubmit(data: BattleForm) {
    battleCreate.mutate(data, {
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
              name='location'
              rules={{ required: 'location is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='location'
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
