import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MindStateCircle } from '@/features/MindStateCircle'
import { CustomSheet } from '@/features/Sheet'
import { useState } from 'react'

export default function MindStateScreen() {
  const [isOpenSheet, setIsOpenSheet] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState<string>(`hsl(90, 75%, 55%)`)

  const handleSheetOpen = () => {
    setIsOpenSheet(true)
  }
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <MindStateCircle openSheet={handleSheetOpen} backgroundSetter={setBackgroundColor} />
        <CustomSheet open={isOpenSheet}>asd</CustomSheet>
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
