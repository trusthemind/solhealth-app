import { Pressable, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { useRouter } from 'expo-router'

interface TabBarButtonProps {
  isFocused: boolean
  label: string
  routeName: string
  color: string
  icon: React.ComponentType<any>
}

const TabBarButton = ({ isFocused, label, routeName, color, icon: Icon }: TabBarButtonProps) => {
  const scale = useSharedValue(0)
  const animatedColor = useSharedValue(color)
  const { push } = useRouter()

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 })
    animatedColor.value = withTiming(isFocused ? '#007f5f' : color, { duration: 300 })
  }, [isFocused])

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4])
    const top = interpolate(scale.value, [0, 1], [0, 8])

    return {
      transform: [{ scale: scaleValue }],
      top,
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: animatedColor.value,
    }
  })

  const animatedIconColor = useAnimatedStyle(() => {
    return {
      color: animatedColor.value,
    }
  })

  return (
    <Pressable style={styles.container} onPress={() => push(routeName as any)}>
      <Animated.View style={animatedIconStyle}>
        <Icon style={animatedIconColor} color={animatedColor.value} size={20} />
      </Animated.View>
      <Animated.Text style={[styles.label, animatedTextStyle]}>{label}</Animated.Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 11,
  },
})

export default TabBarButton
