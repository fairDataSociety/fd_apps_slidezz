import axios from 'axios'
import { useAtom } from 'jotai'
import { googleAccessTokenAtom } from '../../store'
import ImportFileCard from '../Card/ImportFileCard'
import GoogleDriveImportFile from '../GoogleDriveImportFile/GoogleDriveImportFile'
import GoogleslidesIcon from '../Icons/GoolgeslidesIcon'

export default function GoogleSlidesImport() {
  const [googleAccessToken] = useAtom(googleAccessTokenAtom)

  return (
    <GoogleDriveImportFile
      mimeType="application/vnd.google-apps.presentation"
      callback={(data: { id: string; name: string }) => {
        ;(async () => {
          const res = await axios.get(
            `https://docs.google.com/presentation/d/${data.id}/export/html?id=${data.id}`,
            {
              headers: {
                Authorization: `Bearer ${googleAccessToken}`,
              },
            }
          )

          const html = res.data

          console.log(html)
        })()
      }}
    >
      <ImportFileCard
        title="Google Slides"
        description="Select a presentaion from Google Slides"
        Icon={GoogleslidesIcon}
      />
    </GoogleDriveImportFile>
  )
}
