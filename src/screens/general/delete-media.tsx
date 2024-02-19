import { useLogoutMutation } from '../../apis/auth';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../routes';
import { useNavigation } from '@react-navigation/native';
import { logout as logoutSlice } from '../../store/slices';
import { authMainScreen } from '../../utils/constants';
import { Modal } from '../../components/molecules';

export const DeleteMedia = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const { reset, goBack }: StackNavigationProp<StackParamList> =
    useNavigation();
  const handleLogout = () => {
    logout({});
    dispatch(logoutSlice());
    reset({
      index: 0,
      routes: [{ name: authMainScreen }],
    });
  };

  return (
    <Modal
      visible={true}
      title="Delete The Account"
      description="If You Delete Your Account, All Your Data Will Be Deleted Along With It. Do You Approve?"
      onCancel={goBack}
      onApply={handleLogout}
      isLoading={isLoading}
    />
  );
};
