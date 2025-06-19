import { useAnimationControls } from "motion/react"
import { useEffect } from "react"

const useRemovePaddingMarginPostClose = ({
  isOpen,
  startKey,
  endKey,
}: {
  isOpen: boolean
  startKey: string
  endKey: string
}) => {
  // This is a hack to remove the padding and margin of the content after the animation is complete
  const controls = useAnimationControls()
  useEffect(() => {
      if (isOpen) {
          void controls
              .start({
                  padding: '',
                  margin: '',
              })
              .then(() => {
                  void controls.start(startKey)
              })
      } else {
          void controls.start(endKey).then(() => {
              void controls.start({
                  padding: 0,
                  margin: 0,
              })
          })
      }
  }, [controls, isOpen, startKey, endKey])
  return controls
}

export default useRemovePaddingMarginPostClose