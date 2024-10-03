import React, {useEffect, useState} from 'react';
import {Animated, StyleProp, ViewStyle} from 'react-native';

interface ShowFadeInSlideBottomProps {
  style: StyleProp<ViewStyle>;
  delay: number;
  children: React.ReactNode;
}

export const ShowFadeInSlideBottom: React.FC<ShowFadeInSlideBottomProps> = ({
  style,
  delay,
  children,
}) => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsShow(true);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay]);

  const opacity = new Animated.Value(0);
  const translateY = new Animated.Value(100);

  if (isShow) {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Animated.View style={[{opacity, transform: [{translateY}]}, style]}>
      {children}
    </Animated.View>
  );
};
