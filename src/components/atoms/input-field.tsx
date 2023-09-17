//@ts-nocheck
import React, { useState } from 'react';
// import PhoneInput from 'react-phone-input-2';
import { Flex, InputItem, Text, View } from '@ant-design/react-native';

interface InputFieldProps {
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  name?: string;
  onChange: (value: any) => void;
}

const eyeIconStyle = { position: 'absolute', top: '25%', right: '15px', cursor: 'pointer', color: '#CECECE', fontSize: '20px' }

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  name,
}) => {
  const [isPassword, setIsPassword] = useState(true)
  return (
    <View>
      <Flex>
        <Text>{label}</Text>
        {type === 'password' && <Text style={{ fontSize: 12, color: '#707070' }}>(8+ characters)</Text>}
      </Flex>
      <InputItem
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        name={name}
      />
    </View>
  );
};
