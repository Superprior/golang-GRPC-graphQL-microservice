import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class ErrorResponse {
  @Field((type) => String)
  code: string;

  @Field((type) => String)
  message: string;
}
