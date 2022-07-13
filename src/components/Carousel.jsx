import React, { useRef, useState } from 'react';
import { Animated, FlatList, Image, StyleSheet, View } from 'react-native';
import { colors, sizes } from '../constants/theme.js';
import API_CONFIG from '../constants/api-config.js';

export function Carousel({ items, style }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const renderItem = ({ item }) => {
    return (
      <View style={styles.imageWrap}>
        <Image
          source={{
            uri: `${API_CONFIG.BASE_IMAGE_URL}/Image/${item.imageName}`,
            cache: 'reload',
          }}
          style={[styles.image]}
        />
      </View>
    );
  };

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, sizes.width);

    return (
      <View style={styles.dotContainer}>
        {items.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [sizes.base, 14, sizes.base],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              opacity={opacity}
              key={item.colorCode + '_dot'}
              style={[styles.dot, { width: dotSize, height: dotSize }]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View>
      <View style={{ flex: items.length }}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.colorCode}
          renderItem={renderItem}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slideRef}
        />
      </View>
      <View style={styles.dotRootContainer}>{renderDots()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: sizes.width,
    resizeMode: 'contain',
  },
  imageWrap: {
    width: sizes.width,
    height: sizes.height / 2,
    backgroundColor: colors.lightGray,
  },
  dotRootContainer: {
    height: sizes.padding * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotContainer: { flexDirection: 'row', alignItems: 'center' },
  dot: {
    borderRadius: 10,
    backgroundColor: colors.primary,
    marginHorizontal: sizes.base / 2,
  },
});
