'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useAuth } from '@/hooks/authContext'
import { YStack, Input, Button as TamaguiButton, Text as TamaguiText, Spacer, Form } from 'tamagui'
import { Link } from 'expo-router'
import { LoginFormData, loginSchema } from '@/shared/validation/login.schema'
import { Controller, useForm } from 'react-hook-form'
import { AppRoutes } from '@/constants/AppRoutes'
export const LoginForm = () => {
  const { login } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await axios.post('/auth/login', {
        email: data.email,
        password: data.password,
      })
      const token = res.data.token as string
      await login(token)
    } catch (err: any) {
      console.error(err)
      alert(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <Form>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, onBlur } }) => (
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && <TamaguiText color="$red600">{errors.email.message}</TamaguiText>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value, onBlur } }) => (
          <Input placeholder="Password" secureTextEntry value={value} onBlur={onBlur} onChangeText={onChange} />
        )}
      />
      {errors.password && <TamaguiText color="$red600">{errors.password.message}</TamaguiText>}

      <Spacer size="$3" />

      <TamaguiButton onPress={handleSubmit(onSubmit)} disabled={isSubmitting} size="$4" borderRadius="$4">
        Login
      </TamaguiButton>

      <Spacer size="$4" />
      <YStack>
        <TamaguiText color="$gray600">
          Don’t have an account? <Link href={AppRoutes.DASHBOARD}>Sign up</Link>
        </TamaguiText>
      </YStack>
    </Form>
  )
}
