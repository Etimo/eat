import jwt from 'jsonwebtoken';
import { AuthError } from './../types';

type TokenPayload = {
  userId: string;
  userRole: string;
};

export const validateToken = (
  bearerWithToken: string | undefined,
  matchUserId?: string,
): { currentUserId: string; currentUserRole: string } => {
  const token = bearerWithToken?.split('Bearer ')[1];
  if (!token) {
    throw new AuthError('Error.unauthorized');
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new AuthError('jwt secret not set');
  }

  try {
    const { userId, userRole } = jwt.verify(token, secret) as TokenPayload;

    if (matchUserId) {
      if (matchUserId !== matchUserId) {
        throw new AuthError('Error.forbidden');
      }
    }

    return { currentUserId: userId, currentUserRole: userRole };
  } catch (e) {
    console.error('validateToken', e);
    throw new AuthError('Error.unauthorized');
  }
};
