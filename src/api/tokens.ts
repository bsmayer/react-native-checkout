import type { CreateTokenApiRequest, CreateTokenApiResponse } from '../types/requests/create-token';
import { client } from './api';

/**
 * Create a new card token
 */
export async function createCardToken(cardDetails: CreateTokenApiRequest): Promise<CreateTokenApiResponse> {
  const tokenResponse = await client.post<CreateTokenApiResponse>(`/tokens`, cardDetails);
  return tokenResponse.data;
}
