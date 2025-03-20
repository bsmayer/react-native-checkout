type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface Translations {
  /**
   * PaymentForm translations
   */
  paymentForm: {
    /**
     * Field labels
     */
    labels: {
      name: string;
      number: string;
      expiryDate: string;
      securityCode: string;
    };
    /**
     * Buttons
     */
    buttons: {
      pay: string;
    };
    /**
     * Form validation messages
     */
    formValidations: {
      name: {
        required: string;
        minLength: string;
      };
      number: {
        required: string;
        minLength: string;
      };
      expiryDate: {
        required: string;
        minLength: string;
        invalid: string;
        invalidMonth: string;
        invalidYear: string;
        expiredCard: string;
      };
      securityCode: {
        required: string;
        minLength: string;
      };
    };
  };
}

export type PartialTranslations = DeepPartial<Translations>;
