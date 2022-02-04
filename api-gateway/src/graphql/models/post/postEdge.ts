import { ObjectType } from 'type-graphql';
import EdgeResponse from '../pagination/edge';
import Post from './post';

@ObjectType()
export default class PostEdge extends EdgeResponse(Post) {}
