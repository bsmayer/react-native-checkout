import React from 'react';
import { TouchableOpacity, Text, StyleSheet, type StyleProp, type ViewStyle, type TextStyle } from 'react-native';

interface FormButtonProps {
  title: string;
  onPress: () => void;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  buttonTitleStyle?: StyleProp<TextStyle>;
  containerTestID?: string;
  titleTestID?: string;
}

/**
 * A form button component
 */
export function FormButton({
  title,
  onPress,
  buttonContainerStyle,
  buttonTitleStyle,
  containerTestID,
  titleTestID,
}: FormButtonProps): React.ReactElement {
  return (
    <TouchableOpacity
      testID={containerTestID}
      style={[styles.defaultButtonStyle, buttonContainerStyle]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text testID={titleTestID} style={[styles.defaultButtonTitle, buttonTitleStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultButtonStyle: {
    width: '100%',
    height: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  defaultButtonTitle: {
    color: 'white',
    fontWeight: '700',
  },
});
