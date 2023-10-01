import { useDispatch } from "react-redux";
import { AuthStoreType } from "../utils/types";
import { logIn } from "../store/slices";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../routes";
import { useNavigation } from "@react-navigation/native";
import { dashboardScreen, verifyOtpScreen } from "../utils/constants";

export const useOnAuthSuccess = () => {
  // Inside the functional component, you can use hooks
  const { navigate }: StackNavigationProp<StackParamList> = useNavigation();
  const dispatch = useDispatch();

  // Return a function that can be called elsewhere
  return ({ user, token }: AuthStoreType) => {
    if (!!user && !!token) {
      dispatch(logIn({ user, token }));
      if (!user.isEmailVerified) return navigate(verifyOtpScreen, { username: user.email });
      return navigate(dashboardScreen);
    }
    return;
  };
};