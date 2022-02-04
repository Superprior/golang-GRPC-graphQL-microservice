import jwt from 'express-jwt';
import { JWT_ALGORITHM, SECRET_KEY } from '../constants';

const authentication = jwt({
  secret: SECRET_KEY,
  algorithms: [JWT_ALGORITHM]
});
export default authentication;
