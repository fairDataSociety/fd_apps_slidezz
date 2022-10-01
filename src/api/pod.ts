import axios from './customAxios'

export interface GetPodResponse {
  pod_name: string[]
  shared_pod_name: string[]
}

export async function getPods(): Promise<GetPodResponse> {
  return (await axios.get('pod/ls')).data
}

export async function openPod(
  pod_name: string,
  password: string
): Promise<void> {
  return await axios.post('pod/open', {
    pod_name,
    password,
  })
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
