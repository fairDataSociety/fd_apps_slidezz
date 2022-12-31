import { FdpStorage } from '@fairdatasociety/fdp-storage'
import { parse } from 'path'

import { uploadFile } from '../api/fairos/fs'

export async function fairDriveUploadFile(
  podName: string,
  filePath: string,
  data: string,
  fdp?: FdpStorage
) {
  if (fdp) {
    await fdp.file.uploadData(podName, filePath, data)
    return
  }

  const fileName = parse(filePath).base
  const dir = parse(filePath).dir
  const file = new File([data], fileName)

  await uploadFile({ podName, dirPath: dir, file })
}
