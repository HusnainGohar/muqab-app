import { FC } from 'react';
import { StyleSheet } from 'react-native';
import {
  privacyPolicyScreen,
  termsConditionsScreen,
  wp,
} from '../../utils/constants';
import { Text } from '../atoms';
import { Link } from '@react-navigation/native';

export const AuthFooter: FC = () => {
  return (
    <Text type="caption" style={styles.footer}>
      By creating an account you agree to{' '}
      <Link to={`/${termsConditionsScreen}`}>
        <Text type="link"> Terms and conditions </Text>
      </Link>
      and{' '}
      <Link to={`/${privacyPolicyScreen}`}>
        <Text type="link"> Privacy Policy</Text>
      </Link>
    </Text>
  );
};

const styles = StyleSheet.create({
  footer: {
    textAlign: 'center',
    paddingHorizontal: wp('5%'),
  },
});
