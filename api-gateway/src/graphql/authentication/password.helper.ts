import bcrypt from 'bcrypt';
import { SALT } from '../../constants';

export const hashPassword = async (password: string) =>
  bcrypt.hash(password, SALT);

export const comparePassword = async (plaintext: string, hash: string) =>
  bcrypt.compare(plaintext, hash);
