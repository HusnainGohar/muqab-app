import { FC } from 'react';
import { Button as AntButton } from '@ant-design/react-native'
import { Image, Text } from 'react-native';
interface ButtonProps {
    style?: any;
    title: string
    onPress?: () => void;
    isLoading?: boolean
    rightIcon?: any
    type?: string
}

export const Button: FC<ButtonProps> = ({ style = {}, title, onPress, isLoading, rightIcon }) => {

    const buttonStyle = {
        borderRadius: 5,
        // fontFamily: `'Quicksand', sans-serif`,
        ...style
    };

    return (
        <AntButton loading={isLoading} onPress={onPress} style={buttonStyle}>
            <Text>{title}</Text>
            {/* {rightIcon && <Image source={rightIcon} style={{marginLeft: 2}}/>} */}
        </AntButton>
    );
};
