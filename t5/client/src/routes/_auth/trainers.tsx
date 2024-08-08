import { useTrainerProfileDelete } from '@/api/trainer-profile/trainer-profile.mutation'
import { useTrainerProfiles } from '@/api/trainer-profile/trainer-profile.query'
import { useTrainerDelete } from '@/api/trainer/trainer.mutation'
import { useTrainers } from '@/api/trainer/trainer.query'
import TrainerProfileCreate from '@/components/trainer-profile/create-modal'
import TrainerProfileEdit from '@/components/trainer-profile/edit-modal'
import TrainerCreate from '@/components/trainer/create-modal'
import TrainerEdit from '@/components/trainer/edit-modal'
import { createFileRoute } from '@tanstack/react-router'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/_auth/trainers')({
  component: Trainers,
})

export default function Trainers() {
  const { data } = useTrainers()
  const { data: trainerProfileData } = useTrainerProfiles()
  const { trainer } = Route.useRouteContext()

  const trainers = data
    ?.filter((t) => t.id !== trainer.id)
    .map((t) => {
      return {
        ...t,
        profile:
          trainerProfileData?.find(
            (p) => p.trainer_id === t.id
          ) ?? undefined,
      }
    })

  const deleteTrainer = useTrainerDelete()
  const deleteProfile = useTrainerProfileDelete()

  const isAdmin = trainer.role === 'admin'

  const onDelete = (id: number) => {
    deleteTrainer.mutate(id, {
      onSuccess: (data) => {
        const t = data.error ? toast.error : toast.success

        t(data.error ?? 'Trainer deleted')
      },
    })
  }

  const onDeleteProfile = (id: number) => {
    deleteProfile.mutate(id, {
      onSuccess: (data) => {
        const t = data.error ? toast.error : toast.success

        t(data.error ?? 'Trainer profile deleted')
      },
      onError: (error) => {
        toast.error(error.message)
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
            className='bg-pastel-blue-light p-6 rounded-lg shadow-lg grid grid-cols-2 gap-4 overflow-auto'
          >
            <div>
              <h2 className='text-2xl font-semibold mb-2 truncate'>
                {trainer.username}
              </h2>
              <p className='text-lg truncate'>
                {trainer.name}
              </p>
              {isAdmin && (
                <div className='mt-4 flex gap-2'>
                  <TrainerEdit propsTrainer={trainer} />
                  <button
                    className='bg-pastel-pink-dark hover:bg-pastel-pink text-pastel-blue-dark px-4 py-2 rounded'
                    onClick={() => onDelete(trainer.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div>
              {trainer.profile ? (
                <>
                  <h2 className='text-2xl font-semibold mb-2'>
                    Profile
                  </h2>
                  <p className='text-lg truncate'>
                    <b>hometown:</b>{' '}
                    {trainer.profile.hometown}
                  </p>
                  <p className='text-lg truncate'>
                    <b>fp:</b>{' '}
                    {trainer.profile.favorite_pokemon}
                  </p>
                  {isAdmin && (
                    <div className='mt-4 flex gap-2'>
                      <TrainerProfileEdit
                        propsProfile={trainer.profile}
                      />
                      <button
                        className='bg-pastel-pink-dark hover:bg-pastel-pink text-pastel-blue-dark px-4 py-2 rounded'
                        onClick={() =>
                          onDeleteProfile(
                            trainer.profile!.id
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              ) : (
                isAdmin && (
                  <TrainerProfileCreate
                    propsTrainer={trainer}
                  />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
