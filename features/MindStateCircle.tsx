import { MoodState } from '@/constants/MindStates'
import { useState, useEffect } from 'react'
import { Stack, Circle, Text, YStack, XStack, Slider, View, Button } from 'tamagui'

type MindStateProps = {
  openSheet: () => void
  backgroundSetter: React.Dispatch<React.SetStateAction<string>>
}

export function MindStateCircle({ openSheet, backgroundSetter }: MindStateProps) {
  const [moodValue, setMoodValue] = useState(50)
  const [gradientColors, setGradientColors] = useState({
    start: 'hsl(200, 70%, 50%)',
    end: 'hsl(220, 70%, 60%)',
  })
  const [isPulsing, setIsPulsing] = useState(true)

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
    backgroundSetter(start)
  }, [moodValue])

  const getMoodLabel = () => {
    if (moodValue < 15) return MoodState.VeryUnpleasant
    if (moodValue < 35) return MoodState.Unpleasant
    if (moodValue < 50) return MoodState.Neutral
    if (moodValue > 65) return MoodState.Pleasant
    if (moodValue > 85) return MoodState.VeryPleasant
    return MoodState.Neutral
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing((prev) => !prev)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <YStack
      padding="$4"
      alignItems="center"
      width={'100%'}
      justifyContent="space-between"
      height={'87.5%'}
      // background={gradientColors.start}
    >
      <Text fontSize="$6" fontWeight="bold" color={'$black4'}>
        Mind State
      </Text>

      <Stack width={'100%'} height={'50%'} alignItems="center" justifyContent="center">
        <Circle
          size={300}
          position="relative"
          background={`linear-gradient(135deg, ${gradientColors.start}, ${gradientColors.end})`}
          animation="bouncy"
          enterStyle={{
            scale: 0.9,
            opacity: 0.5,
          }}
          shadowColor="$shadowColor"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.3}
          shadowRadius={12}
        >
          {/* Wrapper to center all circles inside */}
          <Circle
            size={250}
            position="absolute"
            backgroundColor="rgba(255, 255, 255, 0.1)"
            animation="lazy"
            scale={isPulsing ? 0.98 : 1.02}
            opacity={isPulsing ? 0.8 : 1}
          />
          <Circle
            size={180}
            position="absolute"
            backgroundColor="rgba(255, 255, 255, 0.15)"
            animation="lazy"
            scale={isPulsing ? 1.02 : 0.98}
            opacity={isPulsing ? 1 : 0.8}
          />

          <Circle
            size={100}
            position="absolute"
            backgroundColor="rgba(255, 255, 255, 0.2)"
            animation="lazy"
            scale={isPulsing ? 0.98 : 1.02}
          />
        </Circle>
      </Stack>

      <Text fontSize="$5" fontWeight="500" marginTop="$2" color="$black4">
        {getMoodLabel()}
      </Text>

      <XStack width="50%" gap={'1rem'} display="flex" flexDirection="row" justifyContent="center">
        <Text fontSize="$2" color="$black4">
          Unpleasant
        </Text>
        <Slider
          size="$12"
          width="100%"
          borderWidth={1}
          borderColor={'$white4'}
          value={[moodValue]}
          max={100}
          step={1}
          onValueChange={(values: number[]) => setMoodValue(values[0])}
        >
          <Slider.Track backgroundColor="$white4">
            <Slider.TrackActive background={`linear-gradient(90deg, ${gradientColors.start}, ${gradientColors.end})`} />
          </Slider.Track>
          <Slider.Thumb
            circular
            index={0}
            size="$3"
            backgroundColor={gradientColors.end}
            shadowOpacity={0.2}
            shadowRadius={4}
            elevation={4}
          />
        </Slider>

        <Text fontSize="$2" color="$black4">
          Pleasant
        </Text>
      </XStack>
      <Button width={'100%'} borderRadius={24} backgroundColor={gradientColors.end} onPress={openSheet}>
        Track
      </Button>
    </YStack>
  )
}
