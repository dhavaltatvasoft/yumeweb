import React from 'react';
import { View, ViewStyle } from 'react-native';

interface Props {
  colors: string[];
  style?: ViewStyle;
  children?: React.ReactNode;
}

const WebLinearGradient: React.FC<Props> = ({ colors, style, children }) => {
  const gradient = `linear-gradient(to right, ${colors.join(', ')})`;

  return (
    <View style={[style, { backgroundImage: gradient } as any]}>
      {children}
    </View>
  );
};

export default WebLinearGradient;
