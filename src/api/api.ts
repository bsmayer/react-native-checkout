import axios, { type AxiosInstance } from 'axios';
import { getEnvironment } from '../config/environment';
import type { Environment } from '../types/environment';

/**
 * The HTTP client initialised
 */
export let client: AxiosInstance;

/**
 * Initialise the API client according to the environment and API token
 */
export function initialiseApiClient(env: Environment, clientId: string) {
  const { apiUrl } = getEnvironment(env);
  client = axios.create({
    baseURL: apiUrl,
    headers: {
      Authorization: `Bearer ${clientId}`,
    },
  });
}
