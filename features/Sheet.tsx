import React from 'react'
import { Sheet } from 'tamagui'

type SheetProps = {
  open: boolean
}

export function CustomSheet({ open }: SheetProps) {
  return (
    <Sheet open={open} animation="medium" zIndex={100}>
      <Sheet.Overlay
        animation="lazy"
        backgroundColor="$shadow6"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Handle />
      <Sheet.Frame padding="$4" justifyContent="center" alignItems="center" gap="$5">
        fsdfsdfsdfsdfsdf
      </Sheet.Frame>
    </Sheet>
  )
}
