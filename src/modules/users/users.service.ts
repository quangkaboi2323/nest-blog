import { HttpException, Injectable } from '@nestjs/common';
import { IUser } from './interface';
import { User } from './model';
import { pick } from 'lodash';
import { UserDTO } from './dto/dto';
import { Article } from '../article/model/article';
import { Comment } from '../article/model/comment';

@Injectable()
export class UsersService {
  async getAllUser() {
    const users: IUser[] = await User.find();
    const response: any = [];
    users.forEach((user) => {
      response.push({
        username: user.username,
        email: user.email,
        image: user.image,
        follower: user.follower.length,
        following: user.following.length,
      });
    });
    return response;
  }

  async getUserById(id: string) {
    const user = await User.findById(id);
    if (!user)
      throw new HttpException(
        { error_code: '404', error_message: 'User is not found.' },
        404,
      );

    const response = pick(user, [
      '_id',
      'username',
      'email',
      'bio',
      'image',
      'follower',
      'following',
      'created_time',
    ]);
    return response;
  }

  async deleteUser(id: string) {
    const user = await User.findByIdAndDelete(id);
    if (!user)
      throw new HttpException(
        { error_code: '404', error_message: 'User is not found.' },
        404,
      );

    await Article.deleteMany({ author: id });
    await Comment.deleteMany({ author: id });

    console.log(User);
    return user;
  }

  async updateUser(id: string, userData: UserDTO) {
    const user: IUser = await User.findByIdAndUpdate(id, userData);
    if (!user)
      throw new HttpException(
        { error_code: '404', error_message: 'User is not found.' },
        404,
      );
    //if(req.body.password) => change password
    if (userData.password) await user.hashPassword();
    user.save();

    const userAfterUpdate = await User.findById(id);
    const response = pick(userAfterUpdate, [
      '_id',
      'username',
      'email',
      'bio',
      'image',
      'created_time',
    ]);
    return response;
  }

  async followUser(currentUserId: string, userId: string) {
    const user: IUser = await User.findById(userId);
    if (!user)
      throw new HttpException(
        { error_code: '404', error_message: 'User is not found.' },
        404,
      );

    const response = {
      profile: pick(user, ['_id', 'username', 'email', 'created_time']),
      following: true,
    };

    if (user.follower.includes(currentUserId)) {
      return response;
    }

    await user.follower.push(currentUserId);
    await user.save();

    const currentUser = await User.findById(currentUserId);
    await currentUser.following.push(userId);
    await currentUser.save();

    return response;
  }

  async unFollowUser(currentUserId: string, userId: string) {
    const user: IUser = await User.findById(userId);
    if (!user)
      throw new HttpException(
        { error_code: '404', error_message: 'User is not found.' },
        404,
      );

    const response = {
      profile: pick(user, ['_id', 'username', 'email', 'created_time']),
      following: false,
    };

    if (!user.follower.includes(currentUserId)) {
      return response;
    }

    user.follower = user.follower.filter(
      (follower) => follower != currentUserId,
    );
    await user.save();

    const currentUser = await User.findById(currentUserId);
    currentUser.following = currentUser.following.filter(
      (following) => following != userId,
    );
    await currentUser.save();

    return response;
  }
}
