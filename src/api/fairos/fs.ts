import axios from './customAxios'
import { openPod, receiveInfoPod, receivePod } from './pod'

interface Dir {
  name: string
  content_type: string
  creation_time: string
  modification_time: string
  access_time: string
}

export interface File {
  name: string
  content_type: string
  size: string
  block_size: string
  creation_time: string
  modification_time: string
  access_time: string
}

export interface GetFilesResponse {
  dirs?: Dir[]
  files?: File[]
}

interface DownloadFileData {
  pod_name: string
  file_path: string
}

interface UploadFileData {
  file: Blob
  pod_name: string
  dir_path: string
}

export async function getFilesAndDirs(
  pod_name: string,
  dir_path: string
): Promise<GetFilesResponse> {
  return (await axios.get('dir/ls', { params: { pod_name, dir_path } })).data
}

export async function downloadFile(data: DownloadFileData): Promise<Blob> {
  const formData = new FormData()
  formData.append('pod_name', data.pod_name)
  formData.append('file_path', data.file_path)

  const downloadedFile = await axios.post('file/download', formData, {
    responseType: 'blob',
  })

  return downloadedFile.data
}

export async function uploadFile(data: UploadFileData) {
  const formData = new FormData()

  formData.append('files', data.file)
  formData.append('pod_name', data.pod_name)
  formData.append('dir_path', data.dir_path)
  formData.append('block_size', '64Mb')

  return await axios.post('file/upload', formData)
}

export async function downloadShared(
  podSharingRef: string,
  filePath: string,
  password: string
) {
  const [isValid, receiveInfo] = await receiveInfoPod(podSharingRef)
  if (!isValid || !receiveInfo) {
    throw new Error(`sharing reference is not valid`)
  }

  await receivePod(podSharingRef)
  await openPod(receiveInfo.pod_name, password)
  const data = await downloadFile({
    pod_name: receiveInfo.pod_name,
    file_path: filePath,
  })
  return data
}
