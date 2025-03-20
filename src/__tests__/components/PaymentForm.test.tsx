import { render, fireEvent, act } from '@testing-library/react-native';
import { PaymentForm } from '../../components/PaymentForm';
import { CheckoutProvider } from '../../state/CheckoutProvider';
import { createCardToken } from '../../api/tokens';

jest.mock('../../api/tokens', () => ({
  createCardToken: jest.fn(),
}));

const mockedCreateCardToken = createCardToken as jest.MockedFunction<typeof createCardToken>;

describe('<PaymentForm />', () => {
  it('Should render PaymentForm component', () => {
    const { getByText, getByTestId } = render(
      <CheckoutProvider environment="sandbox" clientId="xxx" language="en">
        <PaymentForm onSubmit={{ onSuccess: () => {}, onError: () => {} }} />
      </CheckoutProvider>
    );

    // Check if labels are visible
    const nameLabel = getByText('Cardholder name');
    const numberLabel = getByText('Card number');
    const expiryDateLabel = getByText('Expiry date');
    const securityCodeLabel = getByText('Security code');
    const submitButtonTitle = getByText('Pay');

    expect(nameLabel).toBeVisible();
    expect(numberLabel).toBeVisible();
    expect(expiryDateLabel).toBeVisible();
    expect(securityCodeLabel).toBeVisible();
    expect(submitButtonTitle).toBeVisible();

    // Check if text inputs are visible
    const nameInput = getByTestId('cardholderName');
    const numberInput = getByTestId('cardNumber');
    const expiryDateInput = getByTestId('expiryDate');
    const cvvInput = getByTestId('cvv');
    const submitButton = getByTestId('submit');

    expect(nameInput).toBeVisible();
    expect(numberInput).toBeVisible();
    expect(expiryDateInput).toBeVisible();
    expect(cvvInput).toBeVisible();
    expect(submitButton).toBeVisible();
  });

  it('Should validate the [cardholder name] input on blur', async () => {
    const { getByText, getByTestId } = render(
      <CheckoutProvider environment="sandbox" clientId="xxx" language="en">
        <PaymentForm onSubmit={{ onSuccess: () => {}, onError: () => {} }} />
      </CheckoutProvider>
    );

    const nameInput = getByTestId('cardholderName');

    await act(async () => {
      await fireEvent(nameInput, 'blur');
    });

    const nameRequired = getByText('Cardholder name is required');
    expect(nameRequired).toBeVisible();

    await act(async () => {
      await fireEvent.changeText(nameInput, 'B');
      await fireEvent(nameInput, 'blur');
    });

    const nameMinLength = getByText('Provide at least 2 characters');
    expect(nameMinLength).toBeVisible();
  });

  it('Should validate the [card number] input on blur', async () => {
    const { getByText, getByTestId } = render(
      <CheckoutProvider environment="sandbox" clientId="xxx" language="en">
        <PaymentForm onSubmit={{ onSuccess: () => {}, onError: () => {} }} />
      </CheckoutProvider>
    );

    const cardNumberInput = getByTestId('cardNumber');

    await act(async () => {
      await fireEvent(cardNumberInput, 'blur');
    });

    const numberRequired = getByText('Card number is required');
    expect(numberRequired).toBeVisible();

    await act(async () => {
      await fireEvent.changeText(cardNumberInput, '1');
      await fireEvent(cardNumberInput, 'blur');
    });

    const numberMinLength = getByText('The card number is invalid');
    expect(numberMinLength).toBeVisible();
  });

  it('Should validate the [expiry date] input on blur', async () => {
    const { getByText, getByTestId } = render(
      <CheckoutProvider environment="sandbox" clientId="xxx" language="en">
        <PaymentForm onSubmit={{ onSuccess: () => {}, onError: () => {} }} />
      </CheckoutProvider>
    );

    const expiryDateInput = getByTestId('expiryDate');

    // Required
    await act(async () => {
      await fireEvent(expiryDateInput, 'blur');
    });

    const expiryDateRequired = getByText('The expiry date is required');
    expect(expiryDateRequired).toBeVisible();

    // Not all characters typed
    await act(async () => {
      await fireEvent.changeText(expiryDateInput, '06');
      await fireEvent(expiryDateInput, 'blur');
    });

    const expiryDateMinLength = getByText('The expiry date is invalid');
    expect(expiryDateMinLength).toBeVisible();

    // Invalid month
    await act(async () => {
      await fireEvent.changeText(expiryDateInput, '13/27');
      await fireEvent(expiryDateInput, 'blur');
    });

    const invalidMonth = getByText('The month provided is invalid');
    expect(invalidMonth).toBeVisible();

    // Invalid year
    await act(async () => {
      await fireEvent.changeText(expiryDateInput, '06/12');
      await fireEvent(expiryDateInput, 'blur');
    });

    const invalidYear = getByText(`The year cannot be before ${new Date().getFullYear()}`);
    expect(invalidYear).toBeVisible();
  });

  it('Should validate the [security code] input on blur', async () => {
    const { getByText, getByTestId } = render(
      <CheckoutProvider environment="sandbox" clientId="xxx" language="en">
        <PaymentForm onSubmit={{ onSuccess: () => {}, onError: () => {} }} />
      </CheckoutProvider>
    );

    const securityCodeInput = getByTestId('cvv');

    await act(async () => {
      await fireEvent(securityCodeInput, 'blur');
    });

    const cvvRequired = getByText('CVV is required');
    expect(cvvRequired).toBeVisible();

    await act(async () => {
      await fireEvent.changeText(securityCodeInput, '1');
      await fireEvent(securityCodeInput, 'blur');
    });

    const cvvMinLength = getByText('The CVV is invalid');
    expect(cvvMinLength).toBeVisible();
  });

  it('Should validate all fields on button press', async () => {
    const { getByText, getByTestId } = render(
      <CheckoutProvider environment="sandbox" clientId="xxx" language="en">
        <PaymentForm onSubmit={{ onSuccess: () => {}, onError: () => {} }} />
      </CheckoutProvider>
    );

    const submitButton = getByTestId('submit');

    await act(async () => {
      await fireEvent.press(submitButton);
    });

    const nameRequired = getByText('Cardholder name is required');
    const cardNumberRequired = getByText('Card number is required');
    const expiryDateRequired = getByText('The expiry date is required');
    const cvvRequired = getByText('CVV is required');

    expect(nameRequired).toBeVisible();
    expect(cardNumberRequired).toBeVisible();
    expect(expiryDateRequired).toBeVisible();
    expect(cvvRequired).toBeVisible();
  });

  it('Should translate the form when another language is provided', async () => {
    const { getByText } = render(
      <CheckoutProvider environment="sandbox" clientId="xxx" language="pt">
        <PaymentForm onSubmit={{ onSuccess: () => {}, onError: () => {} }} />
      </CheckoutProvider>
    );

    const cardholderNameLabel = getByText('Nome impresso');
    expect(cardholderNameLabel).toBeVisible();
  });

  it('Should translate the form when a new translation is provided', async () => {
    const { getByText } = render(
      <CheckoutProvider
        environment="sandbox"
        clientId="xxx"
        language="es"
        translations={{
          es: {
            paymentForm: {
              labels: {
                name: 'Nombre',
              },
            },
          },
        }}
      >
        <PaymentForm onSubmit={{ onSuccess: () => {}, onError: () => {} }} />
      </CheckoutProvider>
    );

    const cardholderNameLabel = getByText('Nombre');
    expect(cardholderNameLabel).toBeVisible();
  });

  it('Should allow theme customisation', async () => {
    const { getByTestId } = render(
      <CheckoutProvider
        environment="sandbox"
        clientId="xxx"
        style={{
          textInputStyle: { backgroundColor: 'red' },
          labelStyle: { color: 'blue' },
          validationMessagesStyle: { color: 'green' },
          buttonContainerStyle: { backgroundColor: 'tomato' },
          buttonTitleStyle: { color: 'purple' },
        }}
      >
        <PaymentForm onSubmit={{ onSuccess: () => {}, onError: () => {} }} />
      </CheckoutProvider>
    );

    const nameInput = getByTestId('cardholderName');
    expect(nameInput).toHaveStyle({ backgroundColor: 'red' });

    const nameLabel = getByTestId('cardholderNameLabel');
    expect(nameLabel).toHaveStyle({ color: 'blue' });

    const button = getByTestId('submit');
    expect(button).toHaveStyle({ backgroundColor: 'tomato' });

    const buttonTitle = getByTestId('submitButtonTitle');
    expect(buttonTitle).toHaveStyle({ color: 'purple' });

    await act(async () => {
      await fireEvent(nameInput, 'blur');
    });

    const validationMessage = getByTestId('cardholderNameValidation');
    expect(validationMessage).toHaveStyle({ color: 'green' });
  });

  it('Should retrieve the token on a successful API response', async () => {
    const onSuccess = jest.fn();

    const successResponse = {
      token: 'token_xxx',
      bin: '1234',
      expires_on: '2025-02-01',
      last4: '4242',
      expiry_month: 6,
      expiry_year: 2025,
    } as any;

    mockedCreateCardToken.mockImplementationOnce(() => Promise.resolve(successResponse));

    const { getByTestId } = render(
      <CheckoutProvider environment="sandbox" clientId="xxx">
        <PaymentForm onSubmit={{ onSuccess, onError: () => {} }} />
      </CheckoutProvider>
    );

    const nameInput = getByTestId('cardholderName');
    const cardNumberInput = getByTestId('cardNumber');
    const expiryDateInput = getByTestId('expiryDate');
    const cvvInput = getByTestId('cvv');
    const submitButton = getByTestId('submit');

    await act(async () => {
      await fireEvent.changeText(nameInput, 'Tony Stark');
      await fireEvent.changeText(cardNumberInput, '4242 4242 4242 4242');
      await fireEvent.changeText(expiryDateInput, '05/32');
      await fireEvent.changeText(cvvInput, '123');
      await fireEvent.press(submitButton);
    });

    expect(onSuccess).toHaveBeenCalledWith({
      token: successResponse.token,
      bin: successResponse.bin,
      expiresOn: successResponse.expires_on,
      last4: successResponse.last4,
    });
  });

  it('Should return the error on a failed API request', async () => {
    const onError = jest.fn();

    mockedCreateCardToken.mockImplementationOnce(() => Promise.reject('401'));

    const { getByTestId } = render(
      <CheckoutProvider environment="sandbox" clientId="xxx">
        <PaymentForm onSubmit={{ onSuccess: () => {}, onError }} />
      </CheckoutProvider>
    );

    const nameInput = getByTestId('cardholderName');
    const cardNumberInput = getByTestId('cardNumber');
    const expiryDateInput = getByTestId('expiryDate');
    const cvvInput = getByTestId('cvv');
    const submitButton = getByTestId('submit');

    await act(async () => {
      await fireEvent.changeText(nameInput, 'Tony Stark');
      await fireEvent.changeText(cardNumberInput, '4242 4242 4242 4242');
      await fireEvent.changeText(expiryDateInput, '05/32');
      await fireEvent.changeText(cvvInput, '123');
      await fireEvent.press(submitButton);
    });

    expect(onError).toHaveBeenCalledWith('401');
  });
});
