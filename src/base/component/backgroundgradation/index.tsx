import React, {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface BackgroundGradationBoxProps {
  style: StyleProp<ViewStyle>; // Use appropriate type for Modifier
  isRight: boolean;
  children: ReactNode;
}

const BackgroundGradationBox: React.FC<BackgroundGradationBoxProps> = ({
  children,
  style,
  isRight,
}) => {
  return (
    <LinearGradient
      colors={['rgba(0, 122, 255, 0.8)', 'rgba(0, 0, 255, 0)']}
      start={{x: isRight ? 1 : 0, y: 0}}
      end={{x: isRight ? 0 : 1, y: 0}}
      style={[
        style,
        {
          flex: 1,
          justifyContent: 'center',
          alignContent: isRight ? 'flex-end' : 'flex-start',
          alignItems: isRight ? 'flex-end' : 'flex-start',
        },
      ]}>
      {children}
    </LinearGradient>
  );
};

export default BackgroundGradationBox;
