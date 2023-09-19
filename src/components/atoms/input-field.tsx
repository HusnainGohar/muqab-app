//@ts-nocheck
import React, { useMemo, useState } from 'react';
import { Flex, InputItem, View, WhiteSpace } from '@ant-design/react-native';
import { StyleSheet } from 'react-native';
import { colors, fonts, wp } from '../../utils/constants';
import { Text } from './text';
import { InputItemProps } from '@ant-design/react-native/lib/input-item';
import { Button } from './button';

interface InputFieldProps extends InputItemProps {
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  name?: string;
  errorMessage?: string;
  isClearable?: boolean;
  style?: any;
  inputStyle?: any;
  labelStyle?: any;
  onChange: (value: text) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  style = {},
  inputStyle = {},
  labelStyle = {},
  placeholder,
  value,
  onChange,
  name,
  errorMessage = '',
  isClearable = false,
}) => {
  const [isPassword, setIsPassword] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const isError = useMemo(() => errorMessage !== '', [errorMessage]);

  const inputBorderColor = useMemo(() => {
    return isError ? colors.red : isFocused ? colors.primary : colors.black;
  }, [isFocused, isError]);

  const onChangeText = (value: string) => {
    onChange(value);
  };

  return (
    <View style={[styles.generalView, style]}>
      <Text type="h5" style={[labelStyle]}>
        {label}
      </Text>
      <WhiteSpace />
      <View style={[styles.inputView, { borderColor: inputBorderColor }]}>
        <InputItem
          placeholder={placeholder}
          type={isPassword ? type : 'text'}
          placeholderTextColor={colors.darkGrey}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={onChangeText}
          name={name}
          error={isError}
          clear={isClearable}
          style={[
            styles.general,
            inputStyle,
            { paddingRight: type === 'password' ? 25 : 0 },
          ]}
        />
        {type === 'password' && (
          <Button
            type="ghost"
            style={[styles.eyeIcon, { right: isError ? 25 : 0 }]}
            icon={isPassword ? 'eye' : 'eye-invisible'}
            onPress={() => setIsPassword(state => !state)}
          />
        )}
      </View>
      <WhiteSpace size="xs" />
      <Text style={styles.errorMessage} type="caption">
        {errorMessage}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  generalView: {
    width: '100%',
  },
  general: {
    height: 50,
    width: 'auto',
    fontFamily: fonts.quicksand.medium,
    color: colors.black,
  },
  inputView: {
    borderWidth: 1,
    borderRadius: 5,
  },
  eyeIcon: {
    width: 55,
    height: 40,
    borderWidth: 0,
    position: 'absolute',
    top: 4,
  },
  errorMessage: {
    color: colors.red,
    fontSize: 12,
  },
});
