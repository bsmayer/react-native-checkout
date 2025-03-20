# react-native-checkout

Checkout.com React Native library

## Installation

```sh
npm install react-native-checkout

yarn add react-native-checkout
```

## Usage

```tsx
import { CheckoutProvider, PaymentForm } from 'react-native-checkout';

export function App() {
  return (
    <CheckoutProvider environment="sandbox" clientId="your_client_id">
      <PaymentForm
        onSubmit={{
          onSuccess: (token) => {
            console.log(token);
          },
          onError: (err: string) => {
            console.log(err);
          },
        }}
      />
    </CheckoutProvider>
  );
}
```
