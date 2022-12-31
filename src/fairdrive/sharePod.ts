import { FdpStorage } from '@fairdatasociety/fdp-storage'

import { sharePod } from '../api/fairos/pod'

export async function fairDriveSharePod(
  { podName, password = '' }: { podName: string; password: string },
  fdp?: FdpStorage
) {
  if (fdp) {
    const reference = await fdp.personalStorage.share(podName)
    return reference as string
  }
  const response = await sharePod(podName, password)
  return response.podSharingReference
}
