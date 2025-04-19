import React from 'react'
import { View, Text, Button } from 'tamagui'
import dayjs from 'dayjs'
import { Calendar } from '@tamagui/lucide-icons'

const testData = []

export const Header: React.FC = () => {
  return (
    <View display="flex" flexDirection="row">
      <Text>Welcome Back Dev</Text>
      <Button iconAfter={Calendar} variant="outlined">
        {dayjs().format('DD.MM.YYYY')}
      </Button>
    </View>
  )
}
