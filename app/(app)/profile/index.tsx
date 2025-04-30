import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Avatar, Card, H2, H4, Paragraph, Separator, XStack, YStack, Button } from 'tamagui'
import { useState } from 'react'

export default function ProfileScreen() {
  const colorScheme = useColorScheme()
  const [pressed, setPressed] = useState(false)

  const profile = {
    firstName: 'John',
    lastName: 'Doe',
    age: 32,
    weight: '78 kg',
    avatarUrl: 'https://i.pravatar.cc/300',
    lastTrackedMood: 'Unpleasent' as 'Happy' | 'Calm' | 'Unpleasent' | 'Anxious' | 'Sad' | 'Neutral',
    customBG: 'red',
  }

  const getMoodBorderColor = (mood: 'Happy' | 'Calm' | 'Unpleasent' | 'Anxious' | 'Sad' | 'Neutral') => {
    const moodColors: Record<typeof mood, string> = {
      Happy: '$green9',
      Calm: '$blue9',
      Unpleasent: '$red9',
      Anxious: '$orange9',
      Sad: '$purple9',
      Neutral: '$gray9',
    }
    return moodColors[mood]
  }

  const getBgColor = (color: string) => {
    return color === 'red' ? 'rgba(255, 0, 0, 0.05)' : 'transparent'
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: getBgColor(profile.customBG) }]}>
      <YStack padding="$4" space="$4" animation="bouncy" width="100%">
        <H2 fontWeight="bold">Profile</H2>

        <YStack
          alignItems="center"
          space="$4"
          animation="bouncy"
          scale={pressed ? 0.97 : 1}
          opacity={pressed ? 0.9 : 1}
          pressStyle={{ scale: 0.97, opacity: 0.9 }}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
        >
          {/* Avatar with mood-based border */}
          <Avatar size="$12" circular borderWidth={4} borderColor={getMoodBorderColor(profile.lastTrackedMood)}>
            <Avatar.Image src={profile.avatarUrl} />
            <Avatar.Fallback backgroundColor="$blue8" />
          </Avatar>

          {/* Name */}
          <H2 fontWeight="bold">
            {profile.firstName} {profile.lastName}
          </H2>

          {/* Current Mood */}
          <Button
            size="$2"
            backgroundColor={getMoodBorderColor(profile.lastTrackedMood)}
            color="white"
            borderRadius="$6"
            animation="bouncy"
            scale={0.9}
            hoverStyle={{ scale: 0.95 }}
            pressStyle={{ scale: 0.85 }}
          >
            {profile.lastTrackedMood}
          </Button>
        </YStack>

        {/* Profile Info Card */}
        <Card
          bordered
          elevate
          animation="bouncy"
          scale={0.95}
          hoverStyle={{ scale: 0.98 }}
          pressStyle={{ scale: 0.92 }}
          borderRadius="$6"
        >
          <Card.Header padded>
            <H4>Personal Information</H4>
          </Card.Header>

          <Card.Footer padded>
            <XStack justifyContent="space-between" width="100%">
              <YStack space="$2" flex={1} alignItems="center">
                <Paragraph size="$3" color="$gray10">
                  Age
                </Paragraph>
                <H4 fontWeight="bold">{profile.age}</H4>
              </YStack>

              <Separator vertical />

              <YStack space="$2" flex={1} alignItems="center">
                <Paragraph size="$3" color="$gray10">
                  Weight
                </Paragraph>
                <H4 fontWeight="bold">{profile.weight}</H4>
              </YStack>
            </XStack>
          </Card.Footer>
        </Card>

        {/* Activity Card */}
        <Card
          bordered
          elevate
          borderRadius="$6"
          animation="bouncy"
          scale={0.95}
          hoverStyle={{ scale: 0.98 }}
          pressStyle={{ scale: 0.92 }}
        >
          <Card.Header padded>
            <H4>Mental Activity</H4>
          </Card.Header>
          <Card.Footer padded>
            <YStack space="$2" width="100%">
              <Paragraph>
                Current Mood: <Paragraph fontWeight="bold">{profile.lastTrackedMood}</Paragraph>
              </Paragraph>
              <Paragraph>Your mental activity tracking will appear here. Tap to log your current mood.</Paragraph>
              <Button
                marginTop="$2"
                backgroundColor={getMoodBorderColor(profile.lastTrackedMood)}
                color="white"
                animation="bouncy"
                scale={0.95}
                hoverStyle={{ scale: 0.98 }}
                pressStyle={{ scale: 0.92 }}
              >
                Log Mood
              </Button>
            </YStack>
          </Card.Footer>
        </Card>
      </YStack>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
})
