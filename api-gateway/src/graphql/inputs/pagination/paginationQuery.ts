import { InputType, Field, Int } from 'type-graphql';
import { IPaginationQuery } from '../../arguments/IPaginationQuery';

@InputType()
export default class PaginationQueryInput implements IPaginationQuery {
  @Field((type) => Int, { defaultValue: 10 })
  first: number;

  @Field((type) => String, { nullable: true })
  before?: string;

  @Field((type) => String, { nullable: true })
  after?: string;
}
