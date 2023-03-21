import { FdpStorage } from '@fairdatasociety/fdp-storage'

import { getFilesAndDirs } from '../api/fairos/fs'

export interface DirectoryItem {
  dirs: { name: string }[]
  files: { name: string }[]
}

export async function fairDriveLs(
  pod: string,
  path: string,
  fdp?: FdpStorage
): Promise<DirectoryItem> {
  if (fdp) {
    const { directories, files } = await fdp.directory.read(pod, path)
    return {
      dirs: directories.map((dir) => {
        return { name: dir.name }
      }),
      files: files.map((file) => {
        return { name: file.name }
      }),
    }
  }
  const directoryItem = await getFilesAndDirs(pod, path)

  return {
    dirs: directoryItem.dirs
      ? directoryItem.dirs.map((dir) => {
          return {
            name: dir.name,
          }
        })
      : [],
    files: directoryItem.files
      ? directoryItem.files.map((file) => {
          return {
            name: file.name,
          }
        })
      : [],
  }
}
