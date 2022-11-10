import { FdpStorage } from '@fairdatasociety/fdp-storage'

import { getPods } from '../../api/fairos/pod'

export async function fairDrivePods(fdp?: FdpStorage) {
  if (fdp) {
    const pods = await fdp.personalStorage.list()
    return {
      pods: pods.getPods().map((pod) => pod.name),
      sharedPods: pods.getSharedPods().map((pod) => pod.name),
    }
  }
  const pods = await getPods()
  return { pods: pods.pod_name, sharedPods: pods.shared_pod_name }
}
