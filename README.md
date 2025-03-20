# react-native-checkout

Checkout.com React Native library

## Installation

```sh
npm install react-native-checkout

yarn add react-native-checkout
```

## Usage

### 1. Wrap your application within the `ChackoutProvider`

```tsx
import { CheckoutProvider } from 'react-native-checkout';

export function App() {
  return (
    <CheckoutProvider environment="sandbox" clientId="your_client_id-here">
      <MyApp />
    </CheckoutProvider>
  );
}
```

With the `CheckoutProvider` you can also customise the theme of the checkout forms, as well as inject new language or
partially change the existing ones that comes built in with the SDK.

### Changing the theme:

```tsx
import { CheckoutProvider, CustomTheme } from 'react-native-checkout';

const theme: CustomTheme = {
  textInputStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  labelStyle: {
    fontSize: 14,
    color: '#444',
  },
  validationMessagesStyle: {
    color: 'red',
    fontSize: 10,
  },
  buttonContainerStyle: {
    backgroundColor: 'blue',
  },
  buttonTitleStyle: {
    color: 'white',
  },
};

export function App() {
  return (
    <CheckoutProvider environment="sandbox" clientId="your_client_id-here" style={theme}>
      <MyApp />
    </CheckoutProvider>
  );
}
```

### Changing the language

```tsx
import { CheckoutProvider } from 'react-native-checkout';

export function App() {
  return (
    <CheckoutProvider environment="sandbox" clientId="your_client_id" language="pt">
      <MyApp />
    </CheckoutProvider>
  );
}
```

### Add new languages

Please consult the `⁠PartialTranslations` type for the comprehensive translations object. If a language is already set up in the SDK, its keys will be integrated with the existing ones. Conversely, if the language is not yet configured, a new language key will be generated.

```tsx
import { CheckoutProvider } from 'react-native-checkout';

const translations: PartialTranslations = {
  es: {
    paymentForm: {
      labels: {
        name: 'Nombre en la tarjeta',
        numero: 'Número de tarjeta',
      },
    },
  },
};

export function App() {
  return (
    <CheckoutProvider environment="sandbox" clientId="your_client_id" language="es" translations={translations}>
      <MyApp />
    </CheckoutProvider>
  );
}
```

### 2. Using the `PaymentForm`

The `PaymentForm` component will receive the card details and return a token to be used on future transactions. If your application is already wraped within the `CheckoutProvider`, you don't need to do anything else.

```tsx
import { PaymentForm, TokenDetails } from 'react-native-checkout';

export function PaymentScreen() {
  function onSuccess(token: TokenDetails) {
    console.log(token);
  }

  function onError(error: string) {
    console.log(error);
  }

  return <PaymentForm onSubmit={{ onSuccess, onError }} />;
}
```
