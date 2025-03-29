import { createTamagui } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes'
import { createAnimations } from '@tamagui/animations-moti'
import { AnimationDriver } from '@tamagui/web/types/types'
const headingFont = createInterFont()
const bodyFont = createInterFont()

export const tamaguiConfig: ReturnType<typeof createTamagui> = createTamagui({
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  tokens,
  themes,
  shorthands,
  animations: createAnimations({
    fast: {
      type: 'spring',
      damping: 20,
      mass: 1.2,
      stiffness: 250,
    },
    medium: {
      type: 'spring',
      damping: 10,
      mass: 0.9,
      stiffness: 100,
    },
    slow: {
      type: 'spring',
      damping: 20,
      stiffness: 60,
    },
  }) as AnimationDriver<Record<string, any>>,
})

export type AppConfig = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
