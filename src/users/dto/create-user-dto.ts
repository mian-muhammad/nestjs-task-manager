import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @MinLength(4)
  @MaxLength(10)
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password is too short (8 characters min)' })
  @MaxLength(10, { message: 'Password is too long (10 characters max)' })
  readonly password: string;
}
