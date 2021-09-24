import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  readonly bio: string;

  readonly image: string;

  readonly created_time: number;

  readonly following: string[];

  readonly follower: string[];

  readonly favorites: string[];
}
