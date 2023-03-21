import { FdpStorage } from '@fairdatasociety/fdp-storage'

import { getPods } from '../api/fairos/pod'

export async function fairDrivePods(fdp?: FdpStorage) {
  if (fdp) {
    const { pods, sharedPods } = await fdp.personalStorage.list()
    return {
      pods: pods.map((pod) => pod.name),
      sharedPods: sharedPods.map((pod) => pod.name),
    }
  }
  const pods = await getPods()
  return { pods: pods.pods, sharedPods: pods.sharedPods }
}
