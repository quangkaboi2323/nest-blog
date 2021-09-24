import { Schema, Document } from 'mongoose';

export interface IUser extends Document, IUserDoc {
  _id: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  image: string;
  created_time: number;
  following: string[];
  follower: string[];
  favorites: string[];
}

export interface IUserDoc {
  generateToken(): string;
  hashPassword(): void;
  comparePassword(password: string): boolean;
}
