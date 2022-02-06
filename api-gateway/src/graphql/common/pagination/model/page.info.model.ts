import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class PageInfo {
  @Field((type) => Boolean)
  hasNextPage: boolean;

  @Field((type) => Boolean)
  hasPreviousPage: boolean;
}
