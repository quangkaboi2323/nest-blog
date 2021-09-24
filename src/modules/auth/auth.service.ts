import { HttpException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { User } from '../users/model';
import { loginDTO, registerDTO } from './dto/auth';

@Injectable()
export class AuthService {
  async login({ email, password }: loginDTO, res: Response) {
    const user = await User.findOne({ email });
    if (!user)
      throw new HttpException(
        { error_code: '400', error_message: 'Invalid email or password.' },
        400,
      );

    const isValid = await user.comparePassword(password);
    if (!isValid)
      throw new HttpException(
        { error_code: '400', error_message: 'Invalid email or password.' },
        400,
      );

    const token = await user.generateToken();
    const response = {
      username: user.username,
      email: user.email,
      created_time: user.created_time,
    };

    return res.header('x-auth-token', token).send(response);
  }

  async register(registerData: registerDTO) {
    const existedUser = await User.findOne({ email: registerData.email });
    if (existedUser)
      throw new HttpException(
        { error_code: '400', error_message: 'Email is already.' },
        400,
      );

    const user = new User(registerData);
    await user.hashPassword();

    await user.save();

    return user;
  }
}
