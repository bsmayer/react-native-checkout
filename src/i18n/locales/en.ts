import type { Translations } from '../types';

export const en: Translations = {
  paymentForm: {
    labels: {
      name: 'Cardholder name',
      number: 'Card number',
      expiryDate: 'Expiry date',
      securityCode: 'Security code',
    },
    buttons: {
      pay: 'Pay',
    },
    formValidations: {
      name: {
        required: 'Cardholder name is required',
        minLength: 'Provide at least {{minLength}} characters',
      },
      number: {
        required: 'Card number is required',
        minLength: 'The card number is invalid',
      },
      expiryDate: {
        required: 'The expiry date is required',
        minLength: 'The expiry date is invalid',
        invalid: 'The expiry date is invalid',
        invalidMonth: 'The month provided is invalid',
        invalidYear: 'The year cannot be before {{currentYear}}',
        expiredCard: 'This card is expired',
      },
      securityCode: {
        required: 'CVV is required',
        minLength: 'The CVV is invalid',
      },
    },
  },
};
