import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';

interface ShowSlideLeftProps {
  delay: number;
  isFromRight?: boolean;
  children: React.ReactNode;
}

export const ShowSlideLeft: React.FC<ShowSlideLeftProps> = ({
  delay,
  isFromRight = false,
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
  const translateX = new Animated.Value(isFromRight ? 100 : -100);

  if (isShow) {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateX, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Animated.View style={{opacity, transform: [{translateX}]}}>
      {children}
    </Animated.View>
  );
};
