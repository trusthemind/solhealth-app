import { Link, RelativePathString } from 'expo-router'
import { NavigationTab } from '@/app/(tabs)/_layout'
import TabBarButton from './TabBarButton'
import { XStack, styled, useTheme } from 'tamagui'

type TabBarProps = {
  state: {
    index: number
    routes: { name: string; key: string }[]
  }
  descriptors: any
  navigation: any
  tabs: NavigationTab[]
}

const TabBarContainer = styled(XStack, {
  height: 60,
  width: '100%',
  position: 'absolute',
  bottom: 20,
  justifyContent: 'space-evenly',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: 25,
  paddingHorizontal: 20,
  shadowColor: '$shadowColor',
  shadowOffset: { width: 0, height: 10 },
  shadowRadius: 10,
  shadowOpacity: 0.1,
  backgroundColor: '$background',
})

export const TabBar = ({ state, tabs = [] }: TabBarProps) => {
  const theme = useTheme()

  return (
    <TabBarContainer>
      {tabs.map((tab) => {
        const currentIndex = state.routes.findIndex((r: { name: string }) => r.name === tab.route)
        const isFocused = state.index === currentIndex

        return (
          <Link key={tab.name} href={tab.route as RelativePathString} asChild>
            <TabBarButton routeName={tab.route} label={tab.title} icon={tab.icon} isFocused={isFocused} />
          </Link>
        )
      })}
    </TabBarContainer>
  )
}
