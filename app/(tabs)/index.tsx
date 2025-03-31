import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native'

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.areaContainer}>
      <ImageBackground source={require('@/assets/images/blur.png')}></ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  areaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
})
