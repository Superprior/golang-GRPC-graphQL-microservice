import { ObjectType, Field, ClassType } from 'type-graphql';

export function EdgeResponse<TItem>(TItemClass: ClassType<TItem>) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class EdgeResponseClass {
    @Field((type) => TItemClass)
    node: TItem;

    @Field((type) => String)
    cursor: string;
  }
  return EdgeResponseClass;
}
