import { ObjectType, Field, ClassType } from 'type-graphql';
import PageInfo from './pageInfo';

export default function ConnectionResponse<TItem>(
  TItemClass: ClassType<TItem>
) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class ConnectionResponseClass {
    @Field((type) => [TItemClass])
    edges: TItem[];

    @Field((type) => PageInfo)
    pageInfo: PageInfo;
  }
  return ConnectionResponseClass;
}
