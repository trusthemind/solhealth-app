import { Pressable, ViewStyle } from 'react-native'
import React, { useEffect, forwardRef } from 'react'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { RelativePathString, useRouter } from 'expo-router'
import { useTheme } from 'tamagui'

interface TabBarButtonProps {
  isFocused: boolean
  label: string
  routeName: string
  icon: React.ComponentType<any>
}

const TabBarButton = forwardRef<any, TabBarButtonProps>(({ isFocused, label, routeName, icon: Icon }, ref) => {
  const scale = useSharedValue(0)
  const theme = useTheme()
  const { push } = useRouter()

  const defaultColor = theme.color?.val
  const focusedColor = theme.accent?.val

  const animatedColor = useSharedValue(defaultColor)

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 })
    animatedColor.value = withTiming(isFocused ? focusedColor : defaultColor, { duration: 300 })
  }, [isFocused])

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4])
    const top = interpolate(scale.value, [0, 1], [0, 8])

    return {
      transform: [{ scale: scaleValue }],
      top,
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => ({
    color: animatedColor.value,
  }))

  const animatedIconColor = useAnimatedStyle(() => ({
    color: animatedColor.value,
    tintColor: animatedColor.value,
    fill: animatedColor.value,
    stroke: animatedColor.value,
  }))

  return (
    <Pressable ref={ref} style={styles.container} onPress={() => push(routeName as RelativePathString)}>
      <Animated.View style={animatedIconStyle}>
        <Icon style={animatedIconColor} color={animatedColor.value} size={20} />
      </Animated.View>
      <Animated.Text style={[styles.label, animatedTextStyle]}>{label}</Animated.Text>
    </Pressable>
  )
})

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  } as ViewStyle,
  label: {
    fontSize: 11,
  },
}

export default TabBarButton
