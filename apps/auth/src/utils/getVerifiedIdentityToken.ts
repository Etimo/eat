import { IdentityToken } from '#types';
import { OAuth2Client } from 'google-auth-library';

export const getVerifiedIdentityToken = async (
  idToken: string,
): Promise<IdentityToken> => {
  const authClient = new OAuth2Client();

  const ticket = await authClient.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();

  return payload as IdentityToken;
};
