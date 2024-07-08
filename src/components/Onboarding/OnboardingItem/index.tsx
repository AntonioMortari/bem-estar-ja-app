import { useWindowDimensions, Image, View } from 'react-native';
import { Text } from 'react-native-paper';

import { styles } from './styles';
import { ISlidesData } from '../slides';

interface IOnboardingItemProps {
    item: ISlidesData
}

const OnboardingItem = ({ item }: IOnboardingItemProps) => {
    const { width } = useWindowDimensions();

    return (
        <View style={{ width, marginTop: 40 }}>
            <Image source={item.image} style={[styles.image, { width, resizeMode: 'contain' }]} />

            <View style={styles.containerText}>
                <Text variant='headlineMedium' style={styles.title}>{item.title}</Text>
                <Text variant='bodyMedium' style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
}

export { OnboardingItem };