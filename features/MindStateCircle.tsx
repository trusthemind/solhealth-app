import { useState, useEffect } from 'react'
import { Stack, Circle, Text, YStack, XStack, AnimatePresence, Slider } from 'tamagui'

export function MindStateCircle() {
  const [moodValue, setMoodValue] = useState(50)
  const [gradientColors, setGradientColors] = useState({
    start: 'hsl(200, 70%, 50%)',
    end: 'hsl(220, 70%, 60%)',
  })

  // Update colors based on mood value
  useEffect(() => {
    let start, end

    if (moodValue < 20) {
      // Very unpleasant - red/dark red
      start = `hsl(0, ${80 + moodValue}%, ${30 + moodValue / 2}%)`
      end = `hsl(10, ${90 - moodValue / 2}%, ${20 + moodValue / 2}%)`
    } else if (moodValue < 40) {
      // Unpleasant - orange/red
      start = `hsl(${10 + moodValue}, 80%, ${40 + moodValue / 4}%)`
      end = `hsl(${moodValue}, 85%, ${35 + moodValue / 4}%)`
    } else if (moodValue < 60) {
      // Neutral - yellow/green
      start = `hsl(${40 + moodValue}, 75%, 55%)`
      end = `hsl(${60 + moodValue}, 70%, 50%)`
    } else if (moodValue < 80) {
      // Pleasant - green/blue
      start = `hsl(${120 + moodValue}, 65%, ${50 + (moodValue - 60) / 4}%)`
      end = `hsl(${160 + moodValue / 2}, 70%, ${45 + (moodValue - 60) / 4}%)`
    } else {
      // Very pleasant - blue/purple
      start = `hsl(${200 + (moodValue - 80) / 2}, 70%, 60%)`
      end = `hsl(${240 + (moodValue - 80) / 4}, 75%, 65%)`
    }

    setGradientColors({ start, end })
  }, [moodValue])

  // Get mood label based on value
  const getMoodLabel = () => {
    if (moodValue < 20) return 'Very Unpleasant'
    if (moodValue < 40) return 'Unpleasant'
    if (moodValue < 60) return 'Neutral'
    if (moodValue < 80) return 'Pleasant'
    return 'Very Pleasant'
  }

  // Animation for the pulse effect
  const [isPulsing, setIsPulsing] = useState(true)

  // Animation for the mood change
  const [key, setKey] = useState(0)

  useEffect(() => {
    // Trigger animation when mood changes by changing the key
    setKey((prev) => prev + 1)
  }, [moodValue])

  return (
    <YStack padding="$4" alignItems="center" space="$4">
      <Text fontSize="$6" fontWeight="bold">
        Mood Visualizer
      </Text>

      {/* Circle visualization */}
      <AnimatePresence>
        <Stack
          key={key}
          width={250}
          height={250}
          alignItems="center"
          justifyContent="center"
          animation="quick"
          enterStyle={{
            scale: 0.9,
            opacity: 0.5,
          }}
          exitStyle={{
            scale: 1.1,
            opacity: 0,
          }}
        >
          <Circle
            size={250}
            backgroundColor={gradientColors.start}
            animation="bouncy"
            scale={1}
            pressStyle={{ scale: 1.05 }}
            shadowColor="$shadowColor"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.3}
            shadowRadius={8}
          >
            <Circle
              size={180}
              backgroundColor="rgba(255, 255, 255, 0.2)"
              animation="quick"
              scale={isPulsing ? 1 : 1.03}
              onDidAnimate={() => {
                setIsPulsing(!isPulsing)
              }}
            />
          </Circle>
        </Stack>
      </AnimatePresence>

      {/* Mood label */}
      <Text fontSize="$4" fontWeight="500" marginTop="$2">
        {getMoodLabel()}
      </Text>

      {/* Range input using Tamagui's Slider */}
      <YStack width="100%" maxWidth={400} marginTop="$4" paddingHorizontal="$4">
        <Slider
          size="$4"
          width="100%"
          defaultValue={[50]}
          value={[moodValue]}
          max={100}
          step={1}
          onValueChange={(values: number[]) => setMoodValue(values[0])}
        >
          <Slider.Track backgroundColor="$gray5">
            <Slider.TrackActive backgroundColor={gradientColors.start} />
          </Slider.Track>
          <Slider.Thumb
            circular
            index={0}
            size="$4"
            backgroundColor={gradientColors.end}
            borderWidth={2}
            borderColor="white"
            shadowColor="black"
            shadowOpacity={0.2}
            shadowRadius={2}
            elevation={2}
          />
        </Slider>

        <XStack justifyContent="space-between" marginTop="$2">
          <Text fontSize="$2" color="$gray11">
            Unpleasant
          </Text>
          <Text fontSize="$2" color="$gray11">
            Pleasant
          </Text>
        </XStack>
      </YStack>
    </YStack>
  )
}
