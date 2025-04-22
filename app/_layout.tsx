import { TamaguiProvider } from 'tamagui'
import tamaguiConfig from '@/tamagui.config'
import { router, useSegments } from 'expo-router'
import { AuthProvider, useAuth } from '@/hooks/authContext'
import { useEffect } from 'react'
import LoginLayout from './(auth)/login/_layout'
import DashboardLayout from './(app)/dashboard/_layout'
import { AppRoutes } from '@/constants/AppRoutes'

function MainLayout() {
  const { authState } = useAuth()
  const segments = useSegments()

  useEffect(() => {
    if (!authState.authenticated && segments[0] !== '(auth)') {
      router.replace(AppRoutes.LOGIN)
    }

    if (authState.authenticated && segments[0] === '(auth)') {
      router.replace(AppRoutes.DASHBOARD)
    }
  }, [authState, segments, router])

  if (!authState.authenticated) {
    return <LoginLayout />
  }

  return <DashboardLayout />
}

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </TamaguiProvider>
  )
}
