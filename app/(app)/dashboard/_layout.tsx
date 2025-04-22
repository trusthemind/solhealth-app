import { Redirect, Tabs } from 'expo-router'
import React from 'react'
import { AppRoutes } from '@/constants/AppRoutes'
import { LayoutDashboard } from '@tamagui/lucide-icons'
import { User } from '@tamagui/lucide-icons'
import { TabBar } from '@/shared/TabBar'
import { useAuth } from '@/hooks/authContext'

export type NavigationTab = {
  name: string
  title: string
  route: string
  icon: React.ComponentType
}

const NavigationTabs: NavigationTab[] = [
  { name: 'dashboard', title: 'Dashboard', route: AppRoutes.DASHBOARD, icon: LayoutDashboard },
  { name: 'profile', title: 'Profile', route: AppRoutes.PROFILE, icon: User },
]

export default function DashboardLayout() {
  const { authState } = useAuth()
  const { authenticated } = authState

  if (!authenticated) {
    return <Redirect href={AppRoutes.LOGIN} />
  }
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} tabs={NavigationTabs} />}
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
        headerShown: false,
      }}
    ></Tabs>
  )
}
