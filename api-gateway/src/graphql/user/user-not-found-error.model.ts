import { ObjectType } from 'type-graphql';
import { ErrorResponse } from '../common/model/error';

@ObjectType()
export class UserNotFoundError extends ErrorResponse {}
