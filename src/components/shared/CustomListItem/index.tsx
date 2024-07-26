import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './styles';

interface ICustomListItemProps {
    text: string;
}

const CustomListItem = ({ text }: ICustomListItemProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.circulo} />

            <Text variant='bodyLarge'>{text}</Text>
        </View>
    );
}

export { CustomListItem };