import axios from './customAxios'

export interface GetPodResponse {
  pod_name: string[]
  shared_pod_name: string[]
}

export interface SharePodResponse {
  pod_sharing_reference: string
}

export interface ReceiveInfoPodResponse {
  pod_name: string
  pod_address: string
  user_name: string
  user_address: string
  shared_time: string
}

export async function getPods(): Promise<GetPodResponse> {
  return (await axios.get('pod/ls')).data
}

export async function openPod(
  pod_name: string,
  password: string
): Promise<void> {
  await axios.post(
    'pod/open',
    {
      pod_name,
      password,
    },
    { validateStatus: (status) => [200, 500].includes(status) }
  )
}

export async function createPod(
  pod_name: string,
  password: string
): Promise<void> {
  await axios.post('pod/new', {
    pod_name,
    password,
  })
}

export async function sharePod(
  pod_name: string,
  password: string
): Promise<SharePodResponse> {
  return (
    await axios.post('pod/share', {
      pod_name,
      password,
    })
  ).data
}

export async function receiveInfoPod(
  sharingRef: string
): Promise<[boolean, ReceiveInfoPodResponse | null]> {
  const response = await axios.get('pod/receiveinfo', {
    params: {
      sharing_ref: sharingRef,
    },
    validateStatus: (status) => [200, 500].includes(status),
  })

  if (response.status === 500) {
    return [false, null]
  }

  return [true, response.data as ReceiveInfoPodResponse]
}

export async function receivePod(sharingRef: string) {
  await axios.get('pod/receive', {
    params: {
      sharing_ref: sharingRef,
    },
    validateStatus: (status) => [200, 500].includes(status),
  })
}
