import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { baseUrl } from './config'

export function useTest() {
  useQueryClient()

  const ret = useQuery({
    queryKey: ['test'],
    queryFn: () => {
      return fetch(`${baseUrl}/trainers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())
    },
  })

  return ret
}
