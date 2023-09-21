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
      <Text type="link">
        <Link to={`/${termsConditionsScreen}`}>Terms and conditions</Link>
      </Text>{' '}
      and{' '}
      <Text type="link">
        {' '}
        <Link to={`/${privacyPolicyScreen}`}>Privacy Policy</Link>
      </Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  footer: {
    textAlign: 'center',
    paddingHorizontal: wp('15%'),
  },
});
