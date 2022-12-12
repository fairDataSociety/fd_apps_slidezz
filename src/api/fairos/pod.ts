import axios from './customAxios'

export interface GetPodResponse {
  pods: string[]
  sharedPods: string[]
}

export interface SharePodResponse {
  podSharingReference: string
}

export interface ReceiveInfoPodResponse {
  podName: string
  podAddress: string
  userName: string
  userAddress: string
  sharedTime: string
}

export async function getPods(): Promise<GetPodResponse> {
  return (await axios.get('v1/pod/ls')).data
}

export async function openPod(
  podName: string,
  password: string
): Promise<void> {
  await axios.post(
    'v1/pod/open',
    {
      podName,
      password,
    },
    { validateStatus: (status) => [200, 500].includes(status) }
  )
}

export async function createPod(
  podName: string,
  password: string
): Promise<void> {
  await axios.post('v1/pod/new', {
    podName,
    password,
  })
}

export async function sharePod(
  podName: string,
  password: string
): Promise<SharePodResponse> {
  return (
    await axios.post('v1/pod/share', {
      podName,
      password,
    })
  ).data
}

export async function receiveInfoPod(
  sharingRef: string
): Promise<[boolean, ReceiveInfoPodResponse | null]> {
  const response = await axios.get('v1/pod/receiveinfo', {
    params: {
      sharingRef,
    },
    validateStatus: (status) => [200, 500].includes(status),
  })

  if (response.status === 500) {
    return [false, null]
  }

  return [true, response.data as ReceiveInfoPodResponse]
}

export async function receivePod(sharingRef: string) {
  await axios.get('v1/pod/receive', {
    params: {
      sharingRef,
    },
    validateStatus: (status) => [200, 500].includes(status),
  })
}
