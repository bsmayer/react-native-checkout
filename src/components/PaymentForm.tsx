import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useCheckoutProvider } from '../state/CheckoutProvider';
import { FormTextInput } from '../ui/FormTextInput';
import { Space } from '../ui/Space';
import { FormButton } from '../ui/FormButton';
import { createCardToken } from '../api/tokens';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { isNumericString } from '../util/validators';
import { useTranslation } from 'react-i18next';

/**
 * The response in case of a successful token creation
 */
interface TokenDetails {
  token: string;
  expiresOn: string;
  bin: string;
  last4: string;
}

interface PaymentFormProps {
  onSubmit: {
    /**
     * Function called when a token is generated successfully
     */
    onSuccess: (token: TokenDetails) => void;

    /**
     * Function called when something happens on the token generation
     */
    onError: (error: string) => void;
  };
}

interface PaymentFormState {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

/**
 * A payment form component that captures the card details and generate a token
 */
export function PaymentForm({ onSubmit }: PaymentFormProps): React.ReactElement {
  const config = useCheckoutProvider();
  const { t } = useTranslation();

  /**
   * Form configuration
   */
  const { control, handleSubmit } = useForm<PaymentFormState>({
    defaultValues: {
      cardholderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
    mode: 'onBlur',
  });

  /**
   * Submit form
   */
  async function handleSubmitForm(formData: PaymentFormState) {
    try {
      const expiryDate = formData.expiryDate.split('/');
      const expiryMonth = expiryDate[0];
      const expiryYear = expiryDate[1];

      if (!expiryMonth || !expiryYear) {
        return;
      }

      const response = await createCardToken({
        type: 'card',
        number: formData.cardNumber.replaceAll(' ', '').trim(),
        expiry_month: Number(expiryMonth),
        expiry_year: Number(expiryYear),
        cvv: formData.cvv.toString(),
        name: formData.cardholderName,
      });

      return onSubmit.onSuccess({
        bin: response.bin,
        expiresOn: response.expires_on,
        last4: response.last4,
        token: response.token,
      });
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        return onSubmit.onError(err.message);
      }
      return onSubmit.onError(err);
    }
  }

  /**
   * Validate the card expiry date
   */
  function validateExpiryDate(value: string): string | true {
    if (!value) {
      return t('paymentForm.formValidations.expiryDate.required');
    }

    if (value.length < 5) {
      return t('paymentForm.formValidations.expiryDate.minLength', {
        minLength: 5,
      });
    }

    const date = value.split('/');
    const month = date[0]?.trim();
    const year = date[1]?.trim();

    if (!month || !year) {
      return t('paymentForm.formValidations.expiryDate.invalid');
    }

    const validMonth = isNumericString(month) && Number(month) >= 1 && Number(month) <= 12;
    if (!validMonth) {
      return t('paymentForm.formValidations.expiryDate.invalidMonth', {
        month,
      });
    }

    const validYear = isNumericString(year) && 2000 + Number(year) >= new Date().getFullYear();
    if (!validYear) {
      return t('paymentForm.formValidations.expiryDate.invalidYear', {
        currentYear: new Date().getFullYear(),
      });
    }

    const currentMonth = new Date().getMonth() + 1;
    if (2000 + Number(year) === new Date().getFullYear() && currentMonth > Number(month)) {
      return t('paymentForm.formValidations.expiryDate.expiredCard');
    }

    return true;
  }

  return (
    <View style={styles.container}>
      {/* Name */}
      <FormTextInput
        inputTestID="cardholderName"
        labelTestID="cardholderNameLabel"
        validationMessageTestID="cardholderNameValidation"
        name="cardholderName"
        control={control}
        label={t('paymentForm.labels.name')}
        placeholder="Tony Stark"
        autoCorrect={false}
        inputStyle={config.style?.textInputStyle}
        labelStyle={config.style?.labelStyle}
        validationMessageStyle={config.style?.validationMessagesStyle}
        rules={{
          required: t('paymentForm.formValidations.name.required'),
          minLength: {
            value: 2,
            message: t('paymentForm.formValidations.name.minLength', {
              minLength: 2,
            }),
          },
        }}
      />
      <Space size={15} />

      {/* Number */}
      <FormTextInput
        inputTestID="cardNumber"
        name="cardNumber"
        control={control}
        label={t('paymentForm.labels.number')}
        placeholder="1234 1234 1234 1234"
        mask="9999 9999 9999 9999"
        autoCorrect={false}
        keyboardType="numeric"
        onlyNumbers={false}
        maxLength={19}
        inputStyle={config.style?.textInputStyle}
        labelStyle={config.style?.labelStyle}
        validationMessageStyle={config.style?.validationMessagesStyle}
        rules={{
          required: t('paymentForm.formValidations.number.required'),
          minLength: {
            value: 19,
            message: t('paymentForm.formValidations.number.minLength', {
              minLength: 19,
            }),
          },
        }}
      />
      <Space size={15} />

      <View style={styles.horizontalContainer}>
        {/* Expiry date */}
        <FormTextInput
          inputTestID="expiryDate"
          name="expiryDate"
          control={control}
          label={t('paymentForm.labels.expiryDate')}
          placeholder="MM/YY"
          mask="99/99"
          autoCorrect={false}
          containerStyle={styles.horizontalTextInput}
          keyboardType="numeric"
          maxLength={5}
          onlyNumbers
          inputStyle={config.style?.textInputStyle}
          labelStyle={config.style?.labelStyle}
          validationMessageStyle={config.style?.validationMessagesStyle}
          rules={{
            validate: validateExpiryDate,
          }}
        />

        {/* CVV */}
        <FormTextInput
          inputTestID="cvv"
          name="cvv"
          control={control}
          label={t('paymentForm.labels.securityCode')}
          placeholder="CVV"
          autoCorrect={false}
          containerStyle={styles.horizontalTextInput}
          keyboardType="numeric"
          maxLength={3}
          onlyNumbers
          inputStyle={config.style?.textInputStyle}
          labelStyle={config.style?.labelStyle}
          validationMessageStyle={config.style?.validationMessagesStyle}
          rules={{
            required: t('paymentForm.formValidations.securityCode.required'),
            minLength: {
              value: 3,
              message: t('paymentForm.formValidations.securityCode.minLength', {
                minLength: 3,
              }),
            },
          }}
        />
      </View>
      <Space size={25} />

      {/* Submit button */}
      <FormButton
        containerTestID="submit"
        titleTestID="submitButtonTitle"
        title={t('paymentForm.buttons.pay')}
        buttonContainerStyle={config.style?.buttonContainerStyle}
        buttonTitleStyle={config.style?.buttonTitleStyle}
        onPress={handleSubmit(handleSubmitForm)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  horizontalContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  horizontalTextInput: {
    flex: 1,
  },
});
