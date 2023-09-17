import { Text, View } from "@ant-design/react-native";
import { fonts } from "../../utils/constants";

interface TitleProps {
    children: string;
    color?: string;
    style?: any;
}

export const Title: React.FC<TitleProps> = ({ color, style, children }) => {
    return (
        <View style={style}>
            <Text style={{ fontSize: 30, color: color ? color : '#000', fontFamily: fonts.quicksand.bold }}>{children}</Text>
        </View>
    )
}