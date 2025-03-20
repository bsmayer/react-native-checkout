import type { Translations } from '../types';

export const pt: Translations = {
  paymentForm: {
    labels: {
      name: 'Nome impresso',
      number: 'Número do cartão',
      expiryDate: 'Data de expiração',
      securityCode: 'Código de segurança',
    },
    buttons: {
      pay: 'Pagar',
    },
    formValidations: {
      name: {
        required: 'Nome impresso é obrigatório',
        minLength: 'Preencha ao menos {{minLength}} caracteres',
      },
      number: {
        required: 'Número do cartão é obrigatório',
        minLength: 'Número do cartão inválido',
      },
      expiryDate: {
        required: 'Data de expiração é obrigatório',
        minLength: 'Data de expiração inválida',
        invalid: 'Data de expiração inválida',
        invalidMonth: 'Mês inválido',
        invalidYear: 'Ano não pode ser antes de {{currentYear}}',
        expiredCard: 'Cartão expirado',
      },
      securityCode: {
        required: 'CVV é obrigatório',
        minLength: 'CVV inválido',
      },
    },
  },
};
