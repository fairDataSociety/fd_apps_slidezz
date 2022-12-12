import axios from './customAxios'
import { openPod, receiveInfoPod, receivePod } from './pod'

interface Dir {
  name: string
  contentType: string
  creationTime: string
  modificationTime: string
  accessTime: string
}

export interface File {
  name: string
  contentType: string
  size: string
  blockSize: string
  creationTime: string
  modificationTime: string
  accessTime: string
}

export interface GetFilesResponse {
  dirs?: Dir[]
  files?: File[]
}

interface DownloadFileData {
  podName: string
  filePath: string
}

interface UploadFileData {
  file: Blob
  podName: string
  dirPath: string
}

export async function getFilesAndDirs(
  podName: string,
  dirPath: string
): Promise<GetFilesResponse> {
  return (await axios.get('v1/dir/ls', { params: { podName, dirPath } })).data
}

export async function downloadFile(data: DownloadFileData): Promise<Blob> {
  const formData = new FormData()
  formData.append('podName', data.podName)
  formData.append('filePath', data.filePath)

  const downloadedFile = await axios.post('v1/file/download', formData, {
    responseType: 'blob',
  })

  return downloadedFile.data
}

export async function uploadFile(data: UploadFileData) {
  const formData = new FormData()

  formData.append('files', data.file)
  formData.append('podName', data.podName)
  formData.append('dirPath', data.dirPath)
  formData.append('blockSize', '64Mb')

  return await axios.post('v1/file/upload', formData)
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
  await openPod(receiveInfo.podName, password)
  const data = await downloadFile({
    podName: receiveInfo.podName,
    filePath,
  })
  return data
}
