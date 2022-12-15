import { FdpStorage } from '@fairdatasociety/fdp-storage'

import { downloadFile } from '../../api/fairos/fs'

export async function fairDriveDownloadFile(
  pod: string,
  fullPath: string,
  fdp?: FdpStorage
) {
  if (fdp) {
    const data = await fdp.file.downloadData(pod, fullPath)
    return new Blob([data.buffer])
  }
  const data = await downloadFile({ podName: pod, filePath: fullPath })
  return data
}
