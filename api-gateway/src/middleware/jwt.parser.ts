import jwt from 'express-jwt';
import { JWT_ALGORITHM, SECRET_KEY } from '../constants';

const jwtParser = jwt({
  secret: SECRET_KEY,
  credentialsRequired: false,
  algorithms: [JWT_ALGORITHM]
});
export default jwtParser;
