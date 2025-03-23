import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Link, RelativePathString } from 'expo-router'
import { NavigationTab } from '@/app/(tabs)/_layout'
import TabBarButton from './TabBarButton'

const primaryColor = '#007f5f'
const greyColor = '#184e77'

type TabBarProps = {
  state: {
    index: number
    routes: { name: string; key: string }[]
  }
  descriptors: any
  navigation: any
  tabs: NavigationTab[]
}

export const TabBar = ({ state, descriptors, tabs = [] }: TabBarProps) => {
  return (
    <View style={styles.tabbar}>
      {tabs.map((tab) => {
        const currentIndex = state.routes.findIndex((r: { name: string }) => r.name === tab.route)
        const isFocused = state.index === currentIndex

        return (
          <Link key={tab.name} href={tab.route as RelativePathString}>
            <TabBarButton
              routeName={tab.route}
              color={isFocused ? primaryColor : greyColor}
              label={tab.title}
              icon={tab.icon}
              isFocused={isFocused}
            />
          </Link>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabbar: {
    height: 60,
    width: '100%',
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderStyle: 'solid',
    backgroundColor: 'black',
    borderRadius: 25,
    paddingHorizontal: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
})
