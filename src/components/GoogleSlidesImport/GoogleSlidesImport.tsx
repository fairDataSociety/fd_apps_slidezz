import axios from 'axios'
import { useAtom } from 'jotai'
import { googleAccessTokenAtom, slidesAtom } from '../../store'
import { parseGoogleSlides } from '../../utils/parseGoogleSlides'
import ImportFileCard from '../Card/ImportFileCard'
import GoogleDriveImportFile from '../GoogleDriveImportFile/GoogleDriveImportFile'
import GoogleslidesIcon from '../Icons/GoolgeslidesIcon'

export default function GoogleSlidesImport() {
  const [googleAccessToken] = useAtom(googleAccessTokenAtom)
  const setSlides = useAtom(slidesAtom)[1]

  return (
    <GoogleDriveImportFile
      mimeType="application/vnd.google-apps.presentation"
      callback={(data: { id: string; name: string }) => {
        ;(async () => {
          const { data: googleSlidesHTML } = await axios.get(
            `https://docs.google.com/presentation/d/${data.id}/export/html?id=${data.id}`,
            {
              headers: {
                Authorization: `Bearer ${googleAccessToken}`,
              },
            }
          )
          const { data: googleSlidesJSON } = await axios.get(
            `https://slides.googleapis.com/v1/presentations/${data.id}`,
            {
              headers: {
                Authorization: `Bearer ${googleAccessToken}`,
              },
            }
          )
          const revealSlides = parseGoogleSlides(
            googleSlidesHTML,
            googleSlidesJSON
          )

          setSlides({ data: revealSlides })
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
