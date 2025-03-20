import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type CustomStyle = {
  textInputStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  validationMessagesStyle?: StyleProp<TextStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  buttonTitleStyle?: StyleProp<TextStyle>;
};
