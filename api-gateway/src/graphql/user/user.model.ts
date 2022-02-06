import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String, { nullable: true })
  name: string | null;

  password: string;
}
