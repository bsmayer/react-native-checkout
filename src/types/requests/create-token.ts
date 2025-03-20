/**
 * /tokens API request
 */
export interface CreateTokenApiRequest {
  type: 'card';
  name: string;
  number: string;
  expiry_month: number;
  expiry_year: number;
  cvv: string;
}

/**
 * /tokens API response
 */
export interface CreateTokenApiResponse {
  expiry_month: number;
  expiry_year: number;
  bin: string;
  last4: string;
  name: string;
  scheme: 'VISA' | 'MASTERCARD';
  card_type: 'CREDIT' | 'DEBT';
  issuer: string;
  issuer_country: string;
  product_id: string;
  product_type: string;
  token: string;
  expires_on: string;
}
