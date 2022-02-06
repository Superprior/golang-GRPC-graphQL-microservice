import { ArgsType, Field, Int } from 'type-graphql';
import { IPaginationQuery } from './pagination.interface';

@ArgsType()
export class PaginationArgs implements IPaginationQuery {
  @Field((type) => Int, { defaultValue: 10 })
  first: number;

  @Field({ nullable: true })
  before?: string;

  @Field({ nullable: true })
  after?: string;
}
