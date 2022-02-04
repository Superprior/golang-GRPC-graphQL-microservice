import { Field, ObjectType } from 'type-graphql';
import User from '../models/user';

@ObjectType()
export default class LoginResponse extends User {
  @Field()
  accessToken: string;
}
