import { FdpStorage } from '@fairdatasociety/fdp-storage'

import { createPod } from '../../api/fairos/pod'

export async function fairDriveCreatePod(
  { podName, password = '' }: { podName: string; password: string },
  fdp?: FdpStorage
) {
  if (fdp) {
    await fdp.personalStorage.create(podName)
    return
  }

  await createPod(podName, password)
}
