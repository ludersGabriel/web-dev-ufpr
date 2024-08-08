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

import { Battle } from '@/api/battle/battle.query'
import { useBattleUpdate } from '@/api/battle/battle.mutation'

const battleEditSchema = z.object({
  id: z.coerce.number(),
  location: z.string(),
})

export type BattleEditForm = z.infer<
  typeof battleEditSchema
>

type Props = {
  propsBattle: Battle
}

export default function BattleEdit({ propsBattle }: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const battleUpdate = useBattleUpdate()

  const form = useForm<BattleEditForm>({
    resolver: zodResolver(battleEditSchema),
    defaultValues: {
      ...propsBattle,
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        ...propsBattle,
      })
    }
  }, [open, propsBattle, form])

  function onSubmit(data: BattleEditForm) {
    battleUpdate.mutate(data, {
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
