import { useTrainerDelete } from '@/api/trainer/trainer.mutation'
import { useTrainers } from '@/api/trainer/trainer.query'
import TrainerCreate from '@/components/trainer/create-modal'
import { createFileRoute } from '@tanstack/react-router'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/_auth/trainers')({
  component: Trainers,
})

export default function Trainers() {
  const { data } = useTrainers()
  const { trainer } = Route.useRouteContext()

  const trainers = data?.filter((t) => t.id !== trainer.id)

  const deleteTrainer = useTrainerDelete()

  const isAdmin = trainer.role === 'admin'

  const onDelete = (id: number) => {
    deleteTrainer.mutate(id, {
      onSuccess: (data) => {
        const t = data.error ? toast.error : toast.success

        t(data.error ?? 'Trainer deleted')
      },
    })
  }

  return (
    <div className='p-8'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-4xl font-bold'>Trainers</h1>
        {isAdmin && <TrainerCreate />}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {trainers?.map((trainer) => (
          <div
            key={trainer.id}
            className='bg-pastel-blue-light p-6 rounded-lg shadow-lg'
          >
            <h2 className='text-2xl font-semibold mb-2'>
              {trainer.username}
            </h2>
            <p className='text-lg'>{trainer.name}</p>
            {isAdmin && (
              <div className='mt-4 flex gap-2'>
                <button className='bg-pastel-yellow-dark hover:bg-pastel-yellow text-pastel-blue-dark px-4 py-2 rounded'>
                  Edit
                </button>
                <button
                  className='bg-pastel-pink-dark hover:bg-pastel-pink text-pastel-blue-dark px-4 py-2 rounded'
                  onClick={() => onDelete(trainer.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
