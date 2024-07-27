import { IFotosProfissionais } from '@/@types/databaseTypes';
import { useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { styles } from './styles';
import { theme } from '@/theme/paper';

const { width } = Dimensions.get('window');

interface ISliderProps {
    data: IFotosProfissionais[];
}

const Slider = ({ data }: ISliderProps) => {
    const [indexAtivo, setIndexAtivo] = useState<number>(0);

    const handleScroll = (event: any) => {
        const index = Math.ceil(event.nativeEvent.contentOffset.x / width);
        setIndexAtivo(index);
    };

    return (
        <>
            <FlatList
                data={data}
                style={{ maxWidth: width }}
                pagingEnabled
                horizontal
                scrollEventThrottle={16}
                onMomentumScrollEnd={handleScroll}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <Image source={{ uri: item.foto }} width={width} style={{height: 200, width: width}} />}
            />
            {data.length > 1 && (
                <View style={styles.containerDots}>
                    {data.map((_, i) => {
                        return (
                            <View
                                style={[styles.dot, {backgroundColor: i === indexAtivo ? theme.colors.primary : theme.colors.grayLight}]}
                            />
                        )
                    })}
                </View>
            )}
        </>
    );
}

export { Slider };