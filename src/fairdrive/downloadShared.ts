import { FdpStorage } from '@fairdatasociety/fdp-storage'

import { downloadShared } from '../api/fairos/fs'

export async function fairDriveDownloadShared(
  sharedRef: string,
  fdp?: FdpStorage,
  password = ''
) {
  const { parsedSharedRef, filePath } = parseSharedRef(sharedRef)

  if (fdp) {
    const [podSharedInfo, fileSharedInfo] = await Promise.all([
      fdp.personalStorage.getSharedInfo(parsedSharedRef),
      fdp.file.getSharedInfo(parsedSharedRef),
    ])
    const data = await fdp.file.downloadData(
      podSharedInfo.podName,
      fileSharedInfo.meta.filePath
    )
    return new Blob([data.buffer])
  }
  const data = await downloadShared(parsedSharedRef, filePath, password)
  return data
}

function parseSharedRef(sharedRef: string): {
  parsedSharedRef: string
  filePath: string
} {
  if (sharedRef[0] === '0') {
    return {
      parsedSharedRef: sharedRef.slice(1),
      filePath: '',
    }
  }

  if (sharedRef[0] === '1') {
    return {
      parsedSharedRef: sharedRef.slice(1, 65),
      filePath: `/${Buffer.from(
        sharedRef.slice(65),
        'base64'
      ).toString()}.html`,
    }
  }

  return {
    parsedSharedRef: '',
    filePath: '',
  }
}
