import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const primaryColor = '#007f5f'
const greyColor = '#184e77'
type IconProps = {
  color: string
  size: number
}

type Tab = {
  name: string
  title: string
  route: string
  icon: React.ComponentType<IconProps>
}

type TabBarProps = {
  state: {
    index: number
    routes: { name: string; key: string }[]
  }
  descriptors: any
  navigation: any
  tabs: Tab[]
}
export const TabBar = ({ state, descriptors, tabs = [] }: TabBarProps) => {
  return (
    <View style={styles.tabbar}>
      {tabs.map((tab) => {
        const currentIndex = state.routes.findIndex((r: { name: string }) => r.name === tab.route)
        const isFocused = state.index === currentIndex

        const IconComponent = tab.icon

        return (
          <Link href={tab.route as any} asChild>
            <TouchableOpacity key={tab.name} style={styles.tabbarItem}>
              <IconComponent color={isFocused ? primaryColor : greyColor} size={20} />
              <Text
                style={{
                  color: isFocused ? primaryColor : greyColor,
                  fontSize: 11,
                  marginTop: 4,
                }}
              >
                {tab.title}
              </Text>
            </TouchableOpacity>
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
    backgroundColor: '#007f5f',
    borderRadius: 25,
    paddingHorizontal: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabbarItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
})
