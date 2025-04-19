import { DashboardHeader } from '@/features/dashboard/Header'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function DashboardScreen() {
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.content}>
        <DashboardHeader />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    height: '100%',
    width: '100%',
  },
})
