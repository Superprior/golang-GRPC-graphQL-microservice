import { Service } from 'typedi';
import jwt from 'jsonwebtoken';
import { User } from '../user';
import { SECRET_KEY, JWT_EXPIRATION } from '../../config';

@Service()
export class JWTService {
  generateToken(user: Omit<User, 'password'>) {
    return jwt.sign(user, SECRET_KEY, { expiresIn: JWT_EXPIRATION });
  }
}
