import React from 'react'
import { Sheet } from 'tamagui'

type SheetProps = {
  open: boolean
  children: React.ReactNode
}

export function CustomSheet({ open, children }: SheetProps) {
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
        {children}
      </Sheet.Frame>
    </Sheet>
  )
}
