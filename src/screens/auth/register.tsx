import { useDispatch } from 'react-redux';
import { logIn } from '../../store/slices';
import { useNavigation } from '@react-navigation/native';
import { useLoginMutation, useSendOtpMutation } from '../../apis/auth';
import { Alert, StyleSheet } from 'react-native';
import { hp } from '../../utils/constants';
import { Flex, WhiteSpace } from '@ant-design/react-native';
import { Button, Controller } from '../../components/atoms';
import { AuthLayout } from '../../components/organisms';
import { SocialAuth } from '../../components/molecules';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, registerSchema } from '../../utils/schemas';
import { registerFields } from '../../utils/input-fields-details';

export const Register = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const [loginUser, { isLoading: isLoading }] = useLoginMutation();
  const [sendOtp] = useSendOtpMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      retypePassword: '',
    },
  });

  const handleLogin = (params: RegisterSchema) => {
    // loginUser({
    //   username: params.username,
    //   password: params.password,
    // })
    //   .unwrap()
    //   .then((res: any) => {
    //     if (res.data.user.email && !res.data.user.isVerified) {
    //       sendOtp({ username: res.data.user.email })
    //         .unwrap()
    //         .then(() => {
    //           Alert.alert('success');
    //         });
    //     }
    //     dispatch(logIn(res.data));
    //   })
    //   .catch((err: any) => {
    //     console.log('error while login...', err);
    //     Alert.alert(err.data.message);
    //   });
  };

  return (
    <AuthLayout
      title="SignUp Your Account"
      isLogin={false}
      paddingTop={hp('5%')}>
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <Flex direction="column">
        {registerFields.map(item => (
          <Flex key={item.name}>
            <Controller
              control={control}
              errorMessage={errors?.[item?.name]?.message}
              {...item}
            />
            <WhiteSpace />
          </Flex>
        ))}
        <Button
          type="primary"
          isLoading={isLoading}
          onPress={handleSubmit(handleLogin)}
          title="Sign in"
        />
      </Flex>
      <WhiteSpace size="lg" />
      <SocialAuth title="Or SignUp With" />
    </AuthLayout>
  );
};

const styles = StyleSheet.create({});
