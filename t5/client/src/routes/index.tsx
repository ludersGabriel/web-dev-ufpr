import {
  createFileRoute,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { useLogin } from '../api/auth/login'
import { useAuth } from '../auth'
import { flushSync } from 'react-dom'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { trainerQueryOptions } from '@/api/trainer/trainer.query'

export const Route = createFileRoute('/')({
  component: Home,
  beforeLoad: async ({ context }) => {
    const client = context.queryClient

    try {
      const data = await client.fetchQuery(
        trainerQueryOptions
      )

      if (data?.trainer) {
        throw new Error('User authenticated')
      }
    } catch (e) {
      if (
        e instanceof Error &&
        e.message === 'User authenticated'
      ) {
        throw redirect({
          to: '/dashboard',
        })
      }
    }
  },
})

const createLoginSchema = z.object({
  username: z.string().min(3, 'Username is too short'),
  password: z.string().min(3, 'Password is too short'),
})

type LoginForm = z.infer<typeof createLoginSchema>

function Home() {
  const auth = useAuth()
  const navigate = useNavigate()
  const login = useLogin()

  const form = useForm<LoginForm>({
    resolver: zodResolver(createLoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = (formData: LoginForm) => {
    login.mutate(formData, {
      onSuccess: (data) => {
        flushSync(() => {
          auth.setToken(data.token ?? null)
        })

        localStorage.setItem('token', data.token ?? '')

        const t = data.token ? toast.success : toast.error

        t(data.token ? 'Logged in' : 'Failed to login')

        if (data.token) navigate({ to: '/dashboard' })
      },
    })
  }

  return (
    <div className='flex flex-col gap-10 justify-center items-center w-full h-full bg-pastel-yellow'>
      <div className='text-center'>
        <img src='/pokecenter.png' alt='pokecenter' />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 p-5 w-96 rounded-lg shadow-lg bg-pastel-pink'
        >
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-pastel-green'>
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='winstonSmith'
                    {...field}
                    className='text-black border-pastel-green'
                    autoFocus={true}
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
                <FormLabel className='text-pastel-green'>
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='1234change'
                    type='password'
                    {...field}
                    className='text-black border-pastel-green'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='mr-2 bg-pastel-blue'
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
