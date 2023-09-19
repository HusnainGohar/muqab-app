//@ts-nocheck
import React, { useState } from 'react';
import { Flex, InputItem, View } from '@ant-design/react-native';
import { StyleSheet } from 'react-native';
import { wp } from '../../utils/constants';
import { Text } from './text';

interface InputFieldProps {
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  name?: string;
  style?: any;
  inputStyle?: any;
  labelStyle?: any;
  onChange: (value: any) => void;
}

const eyeIconStyle = {
  position: 'absolute',
  top: '25%',
  right: '15px',
  cursor: 'pointer',
  color: '#CECECE',
  fontSize: '20px',
};

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
}) => {
  const [isPassword, setIsPassword] = useState(true);
  return (
    <View style={[styles.generalView, style]}>
      <Flex>
        <Text style={[inputStyle]}>{label}</Text>
        {type === 'password' && (
          <Text style={{ fontSize: 12, color: '#707070' }}>
            (8+ characters)
          </Text>
        )}
      </Flex>
      <InputItem
        placeholder={placeholder}
        secureTextEntry={isPassword}
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        style={[styles.general, inputStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  generalView: {
    width: wp('80%'),
  },
  general: {
    borderWidth: 1,
    borderRadius: 5,
  },
});
