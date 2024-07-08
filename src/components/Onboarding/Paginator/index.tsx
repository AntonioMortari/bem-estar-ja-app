import { Animated, View, useWindowDimensions } from 'react-native';


import { styles } from './styles';
import { ISlidesData } from '../slides';

interface IPaginatorProps {
    data: ISlidesData[];
    scrollX: Animated.Value;
}

const Paginator = ({ data, scrollX }: IPaginatorProps) => {
    const { width } = useWindowDimensions();

    return (
        <View style={{ flexDirection: 'row', height: 34, marginVertical: 10 }}>
            {data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: 'clamp'
                });


                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp'
                })

                return (
                    <Animated.View style={[styles.dot, { width: dotWidth, opacity }]} key={i}></Animated.View>
                );
            })}
        </View>
    );
}

export { Paginator };