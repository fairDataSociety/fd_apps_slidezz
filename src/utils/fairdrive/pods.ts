import { FdpStorage } from '@fairdatasociety/fdp-storage'

import { getPods } from '../../api/fairos/pod'

export async function fairDrivePods(fdp?: FdpStorage) {
  if (fdp) {
    const pods = await fdp.personalStorage.list()
    return pods.getPods().map((pod) => pod.name)
  }
  const pods = await getPods()
  return pods.pod_name
}
