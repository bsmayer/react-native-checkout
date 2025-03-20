import { CheckoutProvider, PaymentForm } from 'react-native-checkout';
import { View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <CheckoutProvider environment="sandbox" clientId="pk_sbox_4stazjxk6b5otb4lld63tgu2ee=" language="en">
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
