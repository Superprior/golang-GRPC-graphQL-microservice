import { InputType, Field } from 'type-graphql';
import { IsEmail } from 'class-validator';

@InputType({ description: 'Register User Input' })
export default class RegisterUserInput {
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Field((type) => String)
  password: string;
}
