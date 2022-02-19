import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class LoginResult {
  @Field()
  accessToken: string;
}
