import { LoginForm } from '@/widgets/login/form'
import { ImageBackground } from 'react-native'
import { View } from 'tamagui'

export default function LoginScreen() {
  return (
    <View position="relative" width={'100%'} height={'100%'}>
      <ImageBackground
        imageStyle={{ position: 'absolute', top: -40 }}
        source={require('@/assets/images/blur.png')}
        style={{ flex: 1, width: '100%', height: '100%' }}
      />
      <LoginForm title="assd" />
    </View>
  )
}
