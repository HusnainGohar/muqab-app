import { colors } from "../../utils/constants";
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Text } from "./text";

interface LinkProps extends TouchableOpacityProps {
  children?: string;
  text?: string;
  style?: any;
  textStyle?: any;
}

export const Link: React.FC<LinkProps> = ({ style = {}, textStyle = {}, text = '', children = '', ...props }) => {
  return (
    <TouchableOpacity
      style={style}
      {...props}
    >
      <Text style={[styles.general, textStyle]}>
        {text ? text : ''}
        {children ? children : ''}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  general: {
    color: colors.black,
    textDecorationLine: 'underline'
  }
})