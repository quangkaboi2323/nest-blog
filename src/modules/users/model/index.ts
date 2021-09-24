import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { IUser } from '../interface';
import config from 'src/config/config';

export const UserSchema = new Schema<IUser>({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  bio: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  created_time: {
    type: Number,
    default: Date.now(),
  },
  following: [
    {
      type: String,
      default: '',
    },
  ],
  follower: [
    {
      type: String,
      default: '',
    },
  ],
  favorites: [
    {
      type: String,
      default: '',
    },
  ],
});

UserSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, config.jwtKey);
};

UserSchema.methods.hashPassword = async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model<IUser>('User', UserSchema);
