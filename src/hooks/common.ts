import { useDispatch } from 'react-redux';
import { SuccessType } from '../utils/types';
import { setUser } from '../store/slices';

export const useOnSuccess = () => {
  // Inside the functional component, you can use hooks
  const dispatch = useDispatch();

  // Return a function that can be called elsewhere
  return ({ user }: SuccessType) => {
    if (!!user) {
      return dispatch(setUser({ user }));
    }
    return;
  };
};
