import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { IArticle } from '../interface/article';

export const ArticleSchema = new Schema<IArticle>({
  title: {
    type: String,
  },
  image: {
    type: String,
    default: '',
  },
  body: {
    type: String,
  },
  author: {
    type: String,
  },
  categories: [
    {
      type: String,
    },
  ],
  favorite: [
    {
      type: String,
      default: [],
    },
  ],
  created_time: {
    type: Number,
    default: Date.now(),
  },
});
export const Article = mongoose.model<IArticle>('Article', ArticleSchema);
