import 'reflect-metadata';
import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { User } from '../user';
import { JWT_EXPIRATION, SECRET_KEY } from '../../constants';

@injectable()
export class JWTService {
  generateToken(user: Omit<User, 'password'>) {
    return jwt.sign(user, SECRET_KEY, { expiresIn: JWT_EXPIRATION });
  }
}
