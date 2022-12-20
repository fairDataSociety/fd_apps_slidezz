import { MoveableManagerInterface, Renderer } from 'react-moveable'

export interface MoveableReplaceImageProps {
  replaceImage?: boolean
  setReplaceImageElement: (target: HTMLImageElement | undefined) => void
}
export const MoveableReplaceImage = {
  name: 'replaceImage',
  props: {
    replaceImage: Boolean,
  },
  events: {},
  render(
    moveable: MoveableManagerInterface<MoveableReplaceImageProps>,
    React: Renderer
  ) {
    const rect = moveable.getRect()
    const imageElement = moveable.props.target?.firstElementChild as
      | HTMLImageElement
      | undefined

    if (!(imageElement?.tagName === 'IMG')) return null

    return (
      <div
        onClick={() => {
          moveable.props.setReplaceImageElement(imageElement)
        }}
        key={'replace-image-viewer'}
        className={'moveable-replace-image'}
        style={{
          cursor: 'pointer',
          position: 'absolute',
          left: `${rect.width / 2}px`,
          top: `${-55}px`,
          background: '#4af',
          borderRadius: '2px',
          padding: '4px 4px',
          color: 'white',
          fontSize: '20px',
          whiteSpace: 'nowrap',
          fontWeight: 'bold',
          willChange: 'transform',
          transform: 'translate(-50%, 0px)',
        }}
      >
        Replace
      </div>
    )
  },
} as const
