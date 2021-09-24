import { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  _id: string;

  title: string;

  image: string;

  body: string;

  author: string;

  categories: string[];

  favorite: string[];

  created_time: number;
}
