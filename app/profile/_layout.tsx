import { Tabs } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'

import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { AppRoutes } from '@/constants/AppRoutes'
import { LayoutDashboard } from '@tamagui/lucide-icons'
import { User } from '@tamagui/lucide-icons'
import { TabBar } from '@/shared/TabBar'
import { Search } from '@tamagui/lucide-icons'

export type NavigationTab = {
  name: string
  title: string
  route: string
  icon: React.ComponentType
}

const NavigationTabs: NavigationTab[] = [
  { name: 'dashboard', title: 'Dashboard', route: AppRoutes.DASHBOARD, icon: LayoutDashboard },
  { name: 'profile', title: 'Profile', route: AppRoutes.PROFILE, icon: User },
  { name: 'asdasDl', title: 'asdasdl', route: '/asdasd', icon: Search },
]

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} tabs={NavigationTabs} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    ></Tabs>
  )
}
