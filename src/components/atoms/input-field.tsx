//@ts-nocheck
import React, { useMemo, useRef, useState } from 'react';
import { Icon, InputItem, View, WhiteSpace } from '@ant-design/react-native';
import { KeyboardTypeOptions, StyleSheet } from 'react-native';
import { colors, fonts } from '../../utils/constants';
import { Text } from './text';
import { InputItemProps } from '@ant-design/react-native/lib/input-item';
import { Button } from './button';
import PhoneInput from 'react-native-phone-number-input';
import OTPInputView from '@twotalltotems/react-native-otp-input';

export type InputTypeOptions =
  | 'number'
  | 'text'
  | 'bankCard'
  | 'phone'
  | 'password'
  | 'digit'
  | KeyboardTypeOptions
  | undefined;

export interface InputFieldProps extends InputItemProps {
  label?: string;
  type?: InputTypeOptions;
  placeholder?: string;
  value?: string;
  name?: string;
  errorMessage?: string;
  isClearable?: boolean;
  style?: any;
  inputStyle?: any;
  labelStyle?: any;
  onChange?: (value: text) => void;
  onBlur?: () => void;
  isOTP?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  style = {},
  inputStyle = {},
  labelStyle = {},
  placeholder,
  value,
  onChange = () => {},
  onBlur = () => {},
  name,
  errorMessage = '',
  isClearable = false,
  isOTP = false,
  ...props
}) => {
  const [isPassword, setIsPassword] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);

  const isError = useMemo(() => errorMessage !== '', [errorMessage]);

  const inputBorderColor = useMemo(() => {
    return isError ? colors.red : isFocused ? colors.primary : colors.black;
  }, [isFocused, isError]);

  const onChangeText = (value: string) => {
    onChange(value);
  };

  const handleOnBlur = () => {
    setIsFocused(false);
    onBlur();
  };

  return (
    <View style={[styles.generalView, style]}>
      {!!label && (
        <>
          <Text type="h5" style={[labelStyle]}>
            {label}
          </Text>
          <WhiteSpace />
        </>
      )}
      {isOTP ? (
        <OTPInputView
          style={styles.general}
          pinCount={4}
          code={value}
          onCodeChanged={onChangeText}
          autoFocusOnLoad={true}
          editable={true}
          codeInputFieldStyle={[
            styles.inputView,
            styles.inputText,
            { borderColor: colors.black },
          ]}
          codeInputHighlightStyle={[
            styles.inputView,
            styles.inputText,
            { borderColor: colors.primary },
          ]}
        />
      ) : (
        <View style={[styles.inputView, { borderColor: inputBorderColor }]}>
          {type === 'phone' ? (
            <PhoneInput
              ref={phoneInput}
              layout="second"
              value={value}
              defaultCode="US"
              onChangeFormattedText={onChangeText}
              placeholder={placeholder}
              containerStyle={[styles.phoneInputContainer]}
              textContainerStyle={styles.phoneInputTextContainer}
              textInputProps={{
                onFocus: () => setIsFocused(true),
                onBlur: handleOnBlur,
                cursorColor: colors.primary,
                placeholderTextColor: colors.darkGrey,
              }}
              textInputStyle={[
                styles.inputText,
                styles.phoneInputTextContainer,
              ]}
              codeTextStyle={[styles.inputText]}
              flagButtonStyle={styles.phoneInputTextContainer}
              renderDropdownImage={
                <Icon name="caret-down" size={'xxs'} color={colors.primary} />
              }
            />
          ) : (
            <InputItem
              placeholder={placeholder}
              type={isPassword ? type : 'text'}
              placeholderTextColor={colors.darkGrey}
              value={value}
              onFocus={() => setIsFocused(true)}
              onBlur={handleOnBlur}
              onChangeText={onChangeText}
              name={name}
              cursorColor={colors.primary}
              error={isError}
              clear={isClearable}
              style={[
                styles.general,
                styles.inputText,
                inputStyle,
                { paddingRight: type === 'password' ? 25 : 0 },
              ]}
              {...props}
            />
          )}
          {type === 'password' && (
            <Button
              type="ghost"
              style={[styles.eyeIcon, { right: isError ? 25 : 0 }]}
              icon={isPassword ? 'eye' : 'eye-invisible'}
              onPress={() => setIsPassword(state => !state)}
            />
          )}
        </View>
      )}
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
  inputText: {
    fontFamily: fonts.quicksand.medium,
    fontSize: 14,
    color: colors.black,
  },
  general: {
    height: 50,
    width: 'auto',
  },
  inputView: {
    borderWidth: 1,
    borderRadius: 8,
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
  phoneInputContainer: {
    borderRadius: 8,
    paddingRight: 5,
    backgroundColor: '#00000000',
    height: 44.5,
  },
  phoneInputTextContainer: {
    height: 44.5,
    backgroundColor: '#00000000',
  },
});
