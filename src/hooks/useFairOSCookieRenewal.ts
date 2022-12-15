import { useAtom } from 'jotai'
import useSWR from 'swr'

import { login } from '../api/fairos/user'
import { fdpAtom, userAtom } from '../store'
import { User } from '../types'

async function userLogin(_: string, user: User) {
  await login({ userName: user.username, password: user.password })
}

export default function useFairOSCookieRenewal() {
  const [user] = useAtom(userAtom)
  const [fdp] = useAtom(fdpAtom)

  const shouldFetch = !!user && !fdp

  useSWR(shouldFetch ? ['FairOS Cookie renewal', user] : null, userLogin, {
    refreshInterval: 300_000,
  })
}
