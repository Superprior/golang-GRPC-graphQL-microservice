import { ObjectType } from 'type-graphql';
import { AppError } from '../../common/model/error';

@ObjectType()
export class DuplicateUser extends AppError {}
