import { StyleSheet } from 'react-native';
import { WhiteSpace } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import { Button, Text } from '../../components/atoms';
import { useLogoutMutation } from '../../apis/auth';
import { useDispatch } from 'react-redux';
import { logout as logoutSlice } from '../../store/slices';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../routes';
import { useNavigation } from '@react-navigation/native';
import { authMainScreen } from '../../utils/constants';

export const Profile = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const { navigate }: StackNavigationProp<StackParamList> = useNavigation();
  const handleLogout = () => {
    logout({});
    dispatch(logoutSlice());
    navigate(authMainScreen);
  };
  return (
    <Layout title="Profile">
      <WhiteSpace size="lg" />
      <Text>Profile</Text>
      <Button title="Logout" isLoading={isLoading} onPress={handleLogout} />
    </Layout>
  );
};

const styles = StyleSheet.create({});
