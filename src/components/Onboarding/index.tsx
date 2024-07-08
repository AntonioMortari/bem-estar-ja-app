import { FlatList, StyleSheet, View, Animated } from 'react-native';
import { OnboardingItem } from './OnboardingItem';
import { useRef, useState } from 'react';
import { Paginator } from './Paginator';
import { slidesData } from './slides';


const Onboarding = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    data={slidesData}
                    renderItem={({ item }) => <OnboardingItem item={item} />}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    bounces={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    showsHorizontalScrollIndicator={false}
                    ref={slidesRef}
                />
            </View>

            <Paginator data={slidesData} scrollX={scrollX} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export { Onboarding }