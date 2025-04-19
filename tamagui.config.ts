import { config as tamagui } from '@tamagui/config/v3'
import { createTamagui, createTokens } from 'tamagui'

const tokens = createTokens({
  ...tamagui.tokens,
  color: {
    white: '#FFF',
    whiteGreen: '#F2F7F7',
    black: '#000',
    azure: '#00044FF',
    blackBlueInk: '#00142B',
    neonOrange: '#FF5930',
    neonGreen: '#ABFA54',
    darkGreen: '#003D31',
  },
})

const light = {
  background: tokens.color.white,
  backgroundHover: tokens.color.whiteGreen,
  backgroundPress: tokens.color.whiteGreen,
  backgroundFocus: tokens.color.whiteGreen,
  borderColor: tokens.color.neonGreen,
  borderColorHover: tokens.color.darkGreen,
  color: tokens.color.black,
  colorHover: tokens.color.darkGreen,
  colorPress: tokens.color.darkGreen,
  colorFocus: tokens.color.darkGreen,
}

type BaseTheme = typeof light

const dark: BaseTheme = {
  background: tokens.color.black,
  backgroundHover: tokens.color.blackBlueInk,
  backgroundPress: tokens.color.blackBlueInk,
  backgroundFocus: tokens.color.blackBlueInk,
  borderColor: tokens.color.darkGreen,
  borderColorHover: tokens.color.neonGreen,
  color: tokens.color.white,
  colorHover: tokens.color.whiteGreen,
  colorPress: tokens.color.whiteGreen,
  colorFocus: tokens.color.whiteGreen,
}

const AllThemes = {
  light,
  dark,
}

const cofigTamagui = { tokens, themes: AllThemes, animations: tamagui.animations }

export const tamaguiConfig = createTamagui(cofigTamagui)

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
