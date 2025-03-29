import React from 'react'
import { YStack, XStack, Text, Button, Theme, Circle, H1, H3 } from 'tamagui'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'tamagui/linear-gradient'
import { ChevronLeft, Home } from '@tamagui/lucide-icons'
import { Image } from 'tamagui'
import { AppRoutes } from '@/constants/AppRoutes'
export default function NotFoundScreen() {
  const router = useRouter()
  return (
    <Theme name="light">
      <LinearGradient
        colors={['$blue4', '$purple3', '$pink4']} // Softer gradient for better visual appeal
        start={[0, 0]}
        end={[1, 1]}
        fullscreen
      >
        <YStack
          flex={1}
          padding="$6"
          justifyContent="center"
          alignItems="center"
          space="$6"
          position="relative"
          overflow="hidden"
        >
          {/* Super colorful floating circles for background effect */}
          <Circle
            size={300}
            backgroundColor="$yellow10"
            opacity={0.4}
            position="absolute"
            top="15%"
            left="20%"
            animation="bouncy"
            enterStyle={{ scale: 0.5, y: -10, opacity: 0 }}
            exitStyle={{ scale: 0.5, y: -10, opacity: 0 }}
          />
          <Circle
            size={200}
            backgroundColor="$purple10"
            opacity={0.4}
            position="absolute"
            bottom="20%"
            left="25%"
            animation="bouncy"
            enterStyle={{ scale: 0.5, y: 10, opacity: 0 }}
            exitStyle={{ scale: 0.5, y: 10, opacity: 0 }}
          />
          <Circle
            size={150}
            backgroundColor="$green6"
            opacity={0.4}
            position="absolute"
            top="5%"
            left="25%"
            animation="bouncy"
            enterStyle={{ scale: 0.5, opacity: 0 }}
            exitStyle={{ scale: 0.5, opacity: 0 }}
          />
          <Circle
            size={180}
            backgroundColor="$orange10"
            opacity={0.4}
            position="absolute"
            bottom="15%"
            right="20%"
            animation="bouncy"
            enterStyle={{ scale: 0.5, opacity: 0 }}
            exitStyle={{ scale: 0.5, opacity: 0 }}
          />
          <Circle
            size={120}
            backgroundColor="$blue10"
            opacity={0.4}
            position="absolute"
            top="30%"
            right="25%"
            animation="bouncy"
            enterStyle={{ scale: 0.5, opacity: 0 }}
            exitStyle={{ scale: 0.5, opacity: 0 }}
          />

          {/* Main content card with soft shadow */}
          <YStack
            backgroundColor="white"
            borderRadius="$6"
            padding="$6"
            width="100%"
            maxWidth={500}
            alignItems="center"
            justifyContent="center"
            animation="bouncy"
            enterStyle={{ y: 10, opacity: 0 }}
            exitStyle={{ y: 10, opacity: 0 }}
            shadowColor="$gray8"
            shadowRadius={20}
            shadowOffset={{ width: 0, height: 10 }}
            shadowOpacity={0.1}
          >
            <H1 fontSize="$8" textAlign="center" color="$black4" fontWeight="bold">
              404
            </H1>
            <Image
              source={require('../assets/images/404-not-found.gif')}
              style={{ width: '100%', height: 400 }}
              alt="Page not found illustration"
            />

            <H3 textAlign="center" color="$black4" fontWeight="normal" fontSize="$6">
              Look like you're lost{' '}
            </H3>

            <Text color="$gray11" textAlign="center" paddingHorizontal="$4" paddingVertical="$2">
              The page you're looking for might have been moved, deleted, or never existed.
            </Text>

            <XStack space="$4" marginTop="$4">
              <Button
                size="$4"
                backgroundColor="$green9"
                color="black"
                borderRadius="$4"
                paddingHorizontal="$6"
                hoverStyle={{ backgroundColor: '$green8' }}
                pressStyle={{ backgroundColor: '$green10' }}
                onPress={() => router.back()}
                icon={ChevronLeft}
              >
                Go Back
              </Button>

              <Button
                size="$4"
                backgroundColor="$gray8"
                color="white"
                borderRadius="$4"
                paddingHorizontal="$6"
                hoverStyle={{ backgroundColor: '$gray9' }}
                pressStyle={{ backgroundColor: '$gray10' }}
                onPress={() => router.push(AppRoutes.DEFAULT)}
                icon={Home}
              >
                Home
              </Button>
            </XStack>
          </YStack>
        </YStack>
      </LinearGradient>
    </Theme>
  )
}
