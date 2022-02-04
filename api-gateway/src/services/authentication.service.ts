import { Service } from 'typedi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../graphql/models/user';
import { JWT_EXPIRATION, SALT, SECRET_KEY } from '../constants';

@Service()
export default class AuthenticationService {
  static async hashPassword(password: string) {
    return bcrypt.hash(password, SALT);
  }

  static async comparePassword(plaintext: string, hash: string) {
    return bcrypt.compare(plaintext, hash);
  }

  static async generateJWT(user: User) {
    return jwt.sign(user, SECRET_KEY, { expiresIn: JWT_EXPIRATION });
  }
}
