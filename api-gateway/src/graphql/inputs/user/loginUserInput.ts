import { InputType, Field } from 'type-graphql';
import { IsEmail } from 'class-validator';

@InputType({ description: 'Login User Input' })
export default class LoginUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
