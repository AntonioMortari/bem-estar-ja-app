import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { styles } from './styles';

interface ITituloSecaoProps {
    titulo: string;
    showButton?: boolean;
    textButton?: string;
    onPress?: () => void;
}

const TituloSecao = ({ onPress, titulo, showButton = true, textButton }: ITituloSecaoProps) => {
    return (
        <View style={styles.container}>
            <Text variant='titleLarge'>{titulo}</Text>

            {showButton && (
                <Button mode='text' onPress={onPress}>{textButton || 'Ver tudo'}</Button>
            )}
        </View>
    );
}

export { TituloSecao };