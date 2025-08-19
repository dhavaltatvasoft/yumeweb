import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  ViewStyle,
  TextStyle,
  Text,
} from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  onRightIconPress?: () => void;
  focusedBorderColor?: string;
  defaultBorderColor?: string;
  error?: string;

}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  containerStyle,
  inputStyle,
  leftIcon,
  rightIcon,
  onRightIconPress,
  error,
  focusedBorderColor = '#4CAF50',
  defaultBorderColor = '#ccc',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
    <View
      style={[
        styles.container,
        containerStyle,
        {
          borderColor: isFocused ? focusedBorderColor : defaultBorderColor,
        },
      ]}
    >
      {leftIcon && <Image source={leftIcon} style={styles.icon} />}
      <TextInput
        {...props}
        style={[
            styles.input,
            inputStyle,
            leftIcon ? { paddingLeft: 0 } : undefined,
            rightIcon ? { paddingRight: 0 } : undefined,
            { outlineStyle: 'none' as any },
          ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor="#999"
        underlineColorAndroid="transparent"
      />
      {rightIcon && (
        <TouchableOpacity onPress={onRightIconPress}>
          <Image source={rightIcon} style={styles.icon} />
        </TouchableOpacity>
      )}
      
    </View>
    {error ? <Text style={styles.errorText}>{error}</Text> : null}

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0, // Helps avoid platform default padding
  },
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 8,
    resizeMode: 'contain',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
});

export default CustomTextInput;
