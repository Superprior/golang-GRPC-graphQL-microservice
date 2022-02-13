import 'reflect-metadata';
import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { User } from '../user';
import { SECRET_KEY, JWT_EXPIRATION } from '../../config';

@injectable()
export class JWTService {
  generateToken(user: Omit<User, 'password'>) {
    return jwt.sign(user, SECRET_KEY, { expiresIn: JWT_EXPIRATION });
  }
}
