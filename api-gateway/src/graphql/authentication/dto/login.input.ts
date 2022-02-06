import { InputType, Field } from 'type-graphql';
import { IsEmail } from 'class-validator';

@InputType({ description: 'Login Input' })
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
