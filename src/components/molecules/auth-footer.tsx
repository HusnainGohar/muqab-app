import { FC } from 'react';
import { Flex, Text } from '@ant-design/react-native';
import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../utils/constants';
interface AuthFooterProps {
}

export const AuthFooter: FC<AuthFooterProps> = ({ }) => {

  return (
    <Flex justify='center' direction='column' >
      <Text style={styles.body}>
        By creating an account you agree to <Text style={styles.link}>Terms and conditions</Text>
        and <Text style={styles.link}>Privacy Policy</Text>
      </Text>
    </Flex>
  );
};

const styles = StyleSheet.create({
body: {
  fontFamily: fonts.quicksand.regular,
  color: colors.darkGrey,
  fontSize: 10
},
link: {
  textDecorationLine: 'underline'
}
})