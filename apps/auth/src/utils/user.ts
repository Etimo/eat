import { UserDto } from '#types';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const BACKEND_URL =
  process.env.BACKEND_URL ?? 'http://host.docker.internal:3100';

export const updateUser = async (user: {
  email: string;
  name: string;
  picture: string;
}): Promise<UserDto | null> => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('jwt secret not set');
    }
    const token = jwt.sign({ userId: undefined }, secret, {
      expiresIn: 60 * 5,
    });

    const response = await axios.patch(
      `${BACKEND_URL}/user/`,
      { user },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data as UserDto;
  } catch (error) {
    return null;
  }
};

export const createNewUser = async (user: {
  email: string;
  name: string;
  picture: string;
}): Promise<UserDto> => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('jwt secret not set');
    }
    const token = jwt.sign({ userId: undefined }, secret, {
      expiresIn: 60 * 5,
    });

    const response = await axios.post(
      `${BACKEND_URL}/user/`,
      { user },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data as UserDto;
  } catch (error) {
    console.log('error', error);
    return {} as UserDto;
  }
};
