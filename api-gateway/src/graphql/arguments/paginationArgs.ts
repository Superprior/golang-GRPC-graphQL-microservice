import { ArgsType, Field, Int } from 'type-graphql';
import { IPaginationQuery } from './IPaginationQuery';

@ArgsType()
export default class PaginationArgs implements IPaginationQuery {
  @Field((type) => Int, { defaultValue: 10 })
  first: number;

  @Field({ nullable: true })
  before?: string;

  @Field({ nullable: true })
  after?: string;
}
