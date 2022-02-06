/* eslint-disable max-classes-per-file */
import { ObjectType, Field, ClassType } from 'type-graphql';
import { PageInfo } from './page.info.model';

export function ConnectionResponse<T>(classRef: ClassType<T>) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema

  @ObjectType(`${classRef.name}Edge`, { isAbstract: true })
  abstract class EdgeType {
    @Field(() => String)
    cursor: string;

    @Field(() => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class ConnectionResponseClass {
    @Field((type) => [EdgeType])
    edges: EdgeType[];

    @Field((type) => PageInfo)
    pageInfo: PageInfo;
  }
  return ConnectionResponseClass;
}
