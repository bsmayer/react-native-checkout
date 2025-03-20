import type { Environment } from '../types/environment';

interface GetEnvironmentResponse {
  apiUrl: string;
}

export function getEnvironment(env: Environment): GetEnvironmentResponse {
  switch (env) {
    case 'sandbox':
      return {
        apiUrl: 'https://api.sandbox.checkout.com',
      };
    case 'production':
      return {
        apiUrl: 'https://api.checkout.com',
      };
    default:
      return {
        apiUrl: 'https://api.sandbox.checkout.com',
      };
  }
}
