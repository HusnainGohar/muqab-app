import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { logIn } from '../../store/slices';
import { useNavigation } from '@react-navigation/native';
import { useLoginMutation, useSendOtpMutation } from '../../apis/auth';
import { Alert, Image, Text } from 'react-native';
import { forgetPasswordScreen, registerScreen, colors } from '../../utils/constants';
import { group } from '../../assets/images';
import { Flex, SegmentedControl, View } from '@ant-design/react-native';
import { Button, InputField } from '../../components/atoms';
import { AuthLayout } from '../../components/organisms';

export const Login = () => {
  const [isLoginWithEmail, setIsLoginWithEmail] = useState(true)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [phone, setPhone] = useState<any>()
  const { navigate } = useNavigation();
  const dispatch = useDispatch()
  const [loginUser, { isLoading: isLoading }] = useLoginMutation();
  const [sendOtp] = useSendOtpMutation();

  const handleLogin = () => {
    if (!email) return Alert.alert(`Email can't be empty`)
    if (!password) return Alert.alert(`Password can't be empty`)
    loginUser({ username: email ?? phone, password }).unwrap().then((res: any) => {
      if (res.data.user.email && !res.data.user.isVerified) {
        sendOtp({ username: res.data.user.email }).unwrap().then(() => {
          Alert.alert('success')
        })
      }
      dispatch(logIn(res.data))
    }).catch((err: any) => {
      console.log('error while login...', err);
      Alert.alert(err.data.message)
    })
  }

  return (
    <AuthLayout title='SignUp Yor Account'>
      <SegmentedControl
        values={['Phone', 'Email']}
        onChange={() => { }}
        onValueChange={(value) => setIsLoginWithEmail(value === 'Email')}
      />
      <Flex direction='column' style={{ width: 400, margin: 0, zIndex: 11 }}>
        <View style={{ marginTop: 24 }}>
          {isLoginWithEmail
            ? <InputField
              type='email'
              onChange={(value: any) => setEmail(value)}
              value={email}
              placeholder='Business Email'
              label='Business Email'
            />
            : <InputField
              type='phone'
              label='Phone no.'
              placeholder='phone'
              onChange={value => setPhone(value)}
              value={phone}
            />
          }
        </View>
        <View style={{ marginTop: 24 }}>
          <InputField
            type='password'
            value={password}
            onChange={(value: any) => setPassword(value)}
            placeholder='Password'
            label='Password'
          />
        </View>
        <Button
          type='text'
          title='Forget password ?'
          onPress={() => navigate(forgetPasswordScreen)}
          style={{ alignSelf: 'end' }}
        />
        <Button
          type='primary'
          isLoading={isLoading}
          onPress={() => handleLogin()}
          title='Sign in'
          style={{ marginTop: '30px', color: colors.white, height: '50px' }}
        />
        <Flex justify='between'>
          <Text style={{ marginBottom: 0, fontWeight: '300' }}>Don't have account ?</Text>
          <Button
            type='link'
            onPress={() => navigate(registerScreen)}
            title='Create an account'
            style={{ fontSize: 12, fontWeight: '300', color: '#6C1EBC' }}
          />
        </Flex>
      </Flex>
    </AuthLayout>
  )
}