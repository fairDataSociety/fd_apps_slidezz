import axios from 'axios'
import { useAtom } from 'jotai'
import { googleAccessTokenAtom, slidesAtom } from '../../store'
import { GoogleSlides } from '../../types/google-slides'
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
          const { data: googleSlides } = await axios.get<GoogleSlides>(
            `https://slides.googleapis.com/v1/presentations/${data.id}`,
            {
              headers: {
                Authorization: `Bearer ${googleAccessToken}`,
              },
            }
          )

          const slideIds = googleSlides.slides.map((slide) => slide.objectId)

          const pageSize = {
            width: googleSlides.pageSize.width.magnitude / 9525,
            height: googleSlides.pageSize.height.magnitude / 9525,
          }

          const slideImages: string[] = []

          for (const slideId of slideIds) {
            const response = await axios.get(
              `https://docs.google.com/presentation/d/${data.id}/export/jpeg?id=${data.id}&pageid=${slideId}`,
              {
                headers: {
                  Authorization: `Bearer ${googleAccessToken}`,
                },
                responseType: 'arraybuffer',
              }
            )

            const slideImage = Buffer.from(response.data, 'binary').toString(
              'base64'
            )
            slideImages.push(slideImage)
          }

          const revealSlides = parseGoogleSlides(slideImages, googleSlides)

          setSlides({
            data: revealSlides,
            height: pageSize.height,
            width: pageSize.width,
          })
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
