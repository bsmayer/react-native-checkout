import React from 'react';
import { Controller, type Control, type RegisterOptions } from 'react-hook-form';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  type TextInputProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { isNumericString } from '../util/validators';

interface FormTextInputProps extends Omit<TextInputProps, 'style'> {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  control: Control<any>;
  name: string;
  rules?: Omit<RegisterOptions<any, string>, 'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'> | undefined;
  mask?: string;
  onlyNumbers?: boolean;
  inputStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  validationMessageStyle?: StyleProp<TextStyle>;
}

/**
 * A text input component to be used on a form
 */
export function FormTextInput({
  label,
  containerStyle,
  control,
  name,
  rules,
  mask,
  onlyNumbers,
  inputStyle,
  labelStyle,
  validationMessageStyle,
  ...rest
}: FormTextInputProps): React.ReactElement {
  /**
   * Apply a mask on a string
   */
  function applyMask(mask: string, input: string): string {
    let output = '';
    let index = 0;
    for (let i = 0; i < mask.length; i++) {
      if (mask[i] === '9') {
        if (index < input.length) {
          output += input[index];
          index++;
        } else {
          break;
        }
      } else {
        output += mask[i];
      }
    }

    if (output.length > 0 && !isNumericString(output[output.length - 1]!)) {
      output = output.slice(0, -1);
    }

    return output;
  }

  /**
   * Intercepts the handle change
   */
  function handleOnChange(value: string, onChange: (...event: any[]) => void) {
    // Handle change for fields without a mask
    if (!mask) {
      if (onlyNumbers && value.length > 0 && !isNumericString(value[value.length - 1]!)) {
        return;
      }
      return onChange(value);
    }

    // Remove all special characters from the string before re-applying the mask
    const cleanString = value.replaceAll(' ', '').replaceAll('-', '').replaceAll('/', '');
    const maskedString = applyMask(mask, cleanString);

    if (onlyNumbers && maskedString.length > 0 && !isNumericString(maskedString[maskedString.length - 1]!)) {
      return;
    }

    onChange(maskedString);
  }

  return (
    <View style={containerStyle}>
      {/* Label */}
      <Text style={[styles.labelDefaultStyle, labelStyle]}>{label}</Text>

      {/* Text Input */}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <TextInput
              style={[styles.inputDefaultStyle, inputStyle]}
              onBlur={field.onBlur}
              onChangeText={(value) => handleOnChange(value, field.onChange)}
              value={field.value}
              {...rest}
            />

            {/* Error message */}
            {!!fieldState.error?.message && (
              <Text style={[styles.errorDefaultStyle, validationMessageStyle]}>{fieldState.error?.message}</Text>
            )}
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputDefaultStyle: {
    width: '100%',
    backgroundColor: '#F1F1F1',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  labelDefaultStyle: {
    marginBottom: 5,
  },
  errorDefaultStyle: {
    color: 'red',
    fontSize: 10,
    marginTop: 3,
  },
});
