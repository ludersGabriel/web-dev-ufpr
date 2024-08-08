import {
  Trainer,
  trainerQueryOptions,
} from '@/api/trainer/trainer.query'
import { useAuth } from '@/auth'
import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
} from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
  beforeLoad: async ({ context }) => {
    const client = context.queryClient

    try {
      const data = await client.fetchQuery(
        trainerQueryOptions
      )

      return { trainer: data.trainer as Trainer }
    } catch (e) {
      throw redirect({
        to: '/',
      })
    }
  },
})

function AuthLayout() {
  const auth = useAuth()

  return (
    <>
      <nav className='bg-pastel-yellow p-4 flex gap-4 text-lg justify-between items-center'>
        <div className='flex gap-4'>
          <Link
            to='/dashboard'
            className='text-pastel-blue-dark hover:text-pastel-blue flex gap-2'
          >
            <img
              src='pokelogo.png'
              alt='logo'
              className='w-8 h-8'
            />
            {'Dashboard'}
          </Link>
          <Link
            to='/trainers'
            className='text-pastel-blue-dark hover:text-pastel-blue'
          >
            Trainers
          </Link>
          <Link
            to='/pokemons'
            className='text-pastel-blue-dark hover:text-pastel-blue'
          >
            Pokemons
          </Link>
          <Link
            to='/profile'
            className='text-pastel-blue-dark hover:text-pastel-blue'
          >
            Profile
          </Link>
        </div>
        <button
          onClick={auth.logout}
          className='text-white bg-pastel-pink-dark hover:bg-pastel-pink px-3 py-1 rounded'
        >
          Logout
        </button>
      </nav>
      <hr className='border-pastel-blue-dark' />
      <div className='p-4'>
        <Outlet />
      </div>
    </>
  )
}
