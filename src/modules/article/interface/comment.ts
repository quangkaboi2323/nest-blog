import { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  _id: string;

  idArticle: string;

  author: string;

  body: string;

  time_post: number;
}
