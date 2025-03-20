import React, { createContext, useContext, useEffect } from 'react';
import type { Environment } from '../types/environment';
import { initialiseApiClient } from '../api/api';
import '../i18n';
import { useTranslation } from 'react-i18next';
import type { PartialTranslations } from '../i18n/types';
import type { CustomStyle } from '../types/custom-style';

export interface CheckoutProviderConfig {
  /**
   * The environment in which you want your payment to go through
   */
  environment: Environment;

  /**
   * Your checkout.com client id
   */
  clientId: string;

  /**
   * Available ready to use languages from the SDK
   */
  language?: string;

  /**
   * A custom translations object
   */
  translations?: { [language: string]: PartialTranslations };

  /**
   * A custom style object to enable customisation of the elements on the screen
   */
  style?: CustomStyle;
}

const CheckoutContext = createContext<CheckoutProviderConfig | undefined>(undefined);

/**
 * Wrap your application with this provider to inject the desired configuration
 */
export function CheckoutProvider({
  environment,
  clientId,
  children,
  language,
  translations,
  style,
}: React.PropsWithChildren<CheckoutProviderConfig>): React.ReactElement {
  const { i18n } = useTranslation();

  /**
   * React to a language change
   */
  useEffect(() => {
    if (i18n.isInitialized) {
      // Override partial translation object
      if (translations) {
        Object.keys(translations).forEach((lang) => {
          i18n.addResourceBundle(lang, 'translation', translations[lang], true, true);
        });
      }

      i18n.changeLanguage(language);
    }
  }, [i18n, language, translations]);

  /**
   * React to an environment change
   */
  useEffect(() => {
    initialiseApiClient(environment, clientId);
  }, [environment, clientId]);

  return (
    <CheckoutContext.Provider value={{ environment, clientId, language, translations, style }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckoutProvider() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('Wrap your application in a CheckoutProvider before using this component');
  }
  return context;
}
