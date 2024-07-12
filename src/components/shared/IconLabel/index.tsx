import { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

interface IIconWithLabelProps {
    label: string | number;
    icon: ReactNode
}

const IconWithLabel = ({ icon, label }: IIconWithLabelProps) => {
    return (
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <View style={{width: 25, alignItems: 'center'}}>
            {icon}
            </View>

            <Text>{label}</Text>
        </View>
    )
}

export { IconWithLabel };