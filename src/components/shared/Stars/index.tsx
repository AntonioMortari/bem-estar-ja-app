import { View } from 'react-native';
import { Text } from 'react-native-paper';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { theme } from '@/theme/paper';

import { styles } from './styles';


interface IStarsProps {
    stars: number;
    showNumber: boolean;
}

export default ({ stars, showNumber }: IStarsProps) => {
    let s = [0, 0, 0, 0, 0];
    let floor = Math.floor(stars);
    let left = stars - floor;

    for (var i = 0; i < floor; i++) {
        s[i] = 2;
    }
    if (left > 0) {
        s[i] = 1;
    }

    return (
        <View style={styles.starArea}>
            {s.map((i, k) => (
                <View key={k} style={{flexDirection: 'row'}}>
                    {i === 0 && <FontAwesome name='star-o' size={18} color={theme.colors.star} />}
                    {i === 1 && <FontAwesome name='star-half' size={18} color={theme.colors.star} />}
                    {i === 2 && <FontAwesome name='star' size={18} color={theme.colors.star} />}
                </View>
            ))}
            {showNumber && <Text style={styles.starText} variant='titleMedium'>{stars.toFixed(1)}</Text>}
        </View>
    );
}