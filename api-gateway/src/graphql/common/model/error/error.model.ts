import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class AppError {
  @Field((type) => Int)
  code: number;

  @Field((type) => String)
  message: string;
}
