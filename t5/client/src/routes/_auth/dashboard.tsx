import {
  createFileRoute,
  Link,
} from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/_auth/dashboard')({
  component: Dashboard,
})

export default function Dashboard() {
  const { trainer } = Route.useRouteContext()
  // Randomized stats
  const [stats, setStats] = useState({
    trainers: 0,
    pokemons: 0,
    battles: 0,
  })

  useEffect(() => {
    const randomStats = {
      trainers: Math.floor(Math.random() * 100),
      pokemons: Math.floor(Math.random() * 500),
      battles: Math.floor(Math.random() * 50),
    }
    setStats(randomStats)
  }, [])

  const randomTasks = tasks
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)

  const randomActivities = recentActivities
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)

  const randomNotifications = notifications
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)

  return (
    <div className='p-8 space-y-8'>
      <h1 className='text-4xl font-bold mb-4'>
        Welcome, {trainer.name}!
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div className='stat-item bg-pastel-blue p-4 rounded-lg shadow-lg'>
          <h3 className='font-bold text-xl'>Trainers</h3>
          <p className='text-2xl'>{stats.trainers}</p>
        </div>
        <div className='stat-item bg-pastel-green p-4 rounded-lg shadow-lg'>
          <h3 className='font-bold text-xl'>Pokémons</h3>
          <p className='text-2xl'>{stats.pokemons}</p>
        </div>
        <div className='stat-item bg-pastel-pink p-4 rounded-lg shadow-lg'>
          <h3 className='font-bold text-xl'>Battles</h3>
          <p className='text-2xl'>{stats.battles}</p>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='recent-activities bg-pastel-yellow-light p-4 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-semibold mb-4'>
            Recent Activities
          </h2>
          <ul className='space-y-2'>
            {randomActivities.map((activity, index) => (
              <li
                key={index}
                className='bg-pastel-blue-light p-2 rounded-md border border-pastel-blue shadow-md'
              >
                {activity}
              </li>
            ))}
          </ul>
        </div>

        <div className='quick-links bg-pastel-yellow-light p-4 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-semibold mb-4'>
            Quick Links
          </h2>
          <ul className='space-y-2'>
            <li className='bg-pastel-pink-dark p-2 rounded-md border border-pastel-green shadow-md text-pastel-green'>
              <Link
                to='/trainers'
                className=' hover:text-pastel-blue'
              >
                {trainer.role === 'admin'
                  ? 'Manage Trainers'
                  : 'View Trainers'}
              </Link>
            </li>
            <li className='bg-pastel-pink-dark p-2 rounded-md border border-pastel-green shadow-md text-pastel-green'>
              <Link
                to='/pokemons'
                className=' hover:text-pastel-blue'
              >
                {trainer.role === 'admin'
                  ? 'Manage Pokémons'
                  : 'View Pokémons'}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className='notifications bg-pastel-yellow-light p-4 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold mb-4'>
          Notifications
        </h2>
        <ul className='space-y-2'>
          {randomNotifications.map(
            (notification, index) => (
              <li
                key={index}
                className='bg-pastel-pink-light p-2 rounded-md border border-pastel-pink shadow-md'
              >
                {notification}
              </li>
            )
          )}
        </ul>
      </div>

      <div className='task-list bg-pastel-yellow-light p-4 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold mb-4'>
          Your Tasks
        </h2>
        <ul className='space-y-2'>
          {randomTasks.map((task, index) => (
            <li
              key={index}
              className='bg-pastel-blue-light p-2 rounded-md border border-pastel-blue shadow-md'
            >
              {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const tasks = [
  'Catch 5 new Pokémon',
  'Win 3 battles',
  'Train Pikachu to level 20',
  'Complete a trade with another trainer',
  'Visit the Pokémon Center',
  'Evolve a Pokémon',
  'Collect 10 Pokéballs',
  'Participate in a Gym battle',
  'Hatch an egg',
  'Catch a rare Pokémon',
  'Find and battle a legendary Pokémon',
  'Collect 5 berries',
  'Complete a research task',
  'Walk 5 kilometers with your buddy',
  'Earn a new badge',
  'Catch a Pokémon of each type',
  'Take a snapshot of a Pokémon',
  'Power up a Pokémon 3 times',
  'Join a raid battle',
  'Send a gift to a friend',
]

const recentActivities = [
  'Trainer John caught a Pikachu',
  'Trainer Jane won a battle',
  'Trainer Mike signed up',
  'Trainer Sarah evolved a Charmander',
  'Trainer Bob traded a Bulbasaur',
  'Trainer Alice caught a Squirtle',
  'Trainer Chris completed a research task',
  'Trainer Dave hatched an egg',
  'Trainer Emma won a Gym battle',
  'Trainer Frank caught a Snorlax',
  'Trainer Grace evolved an Eevee',
  'Trainer Hank collected 10 Pokéballs',
  'Trainer Ivy participated in a raid battle',
  'Trainer Jack caught a legendary Pokémon',
  'Trainer Kate collected 5 berries',
  'Trainer Leo powered up a Pokémon 3 times',
  'Trainer Mia earned a new badge',
  'Trainer Nick walked 5 kilometers with his buddy',
  'Trainer Olivia caught a rare Pokémon',
  'Trainer Paul sent a gift to a friend',
]

const notifications = [
  'Your battle with Trainer Jake is scheduled for tomorrow!',
  'New Pokémon available in the wild!',
  'Special event happening this weekend!',
  'A new research task is available!',
  'Your egg is about to hatch!',
  'A Gym battle is starting soon!',
  'Your buddy has found a candy!',
  'A legendary Pokémon has appeared nearby!',
  'You received a gift from a friend!',
  'Your Pokémon needs healing!',
  'A new raid battle is available!',
  'You have earned a new badge!',
  'Your Pokémon has evolved!',
  'A special trade is available!',
  'Your Pokéball supply is low!',
  'A new update is available for the app!',
  'Your buddy is feeling happy!',
  'A rare Pokémon has been spotted!',
  'Your Pokémon has reached level 20!',
  'A new Gym leader has appeared!',
]
