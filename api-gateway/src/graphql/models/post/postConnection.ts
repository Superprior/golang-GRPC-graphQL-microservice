import { ObjectType } from 'type-graphql';
import ConnectionResponse from '../pagination/connection';
import PostEdge from './postEdge';

@ObjectType()
export default class PostConnection extends ConnectionResponse(PostEdge) {}
