import axios from './customAxios'

export interface GetPodResponse {
  pod_name: string[]
  shared_pod_name: string[]
}

export interface SharePodResponse {
  pod_sharing_reference: string
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
