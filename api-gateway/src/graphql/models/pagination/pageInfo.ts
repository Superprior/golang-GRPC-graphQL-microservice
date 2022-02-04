import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export default class PageInfo {
  @Field((type) => Boolean)
  hasNextPage: boolean;

  @Field((type) => Boolean)
  hasPreviousPage: boolean;
}
