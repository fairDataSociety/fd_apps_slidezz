import { FdpStorage } from '@fairdatasociety/fdp-storage'

import { login } from '../../api/fairos/user'

export async function fairDriveLogin(
  username: string,
  password: string,
  fdp?: FdpStorage
) {
  if (fdp) {
    await fdp.account.login(username, password)
    return
  }
  await login({ user_name: username, password: password })
}
