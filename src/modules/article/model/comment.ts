import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { IComment } from '../interface/comment';

export const CommentSchema = new Schema<IComment>({
  idArticle: {
    type: String,
  },
  author: {
    type: String,
  },
  body: {
    type: String,
  },
  time_post: {
    type: Number,
    default: Date.now(),
  },
});

export const Comment = mongoose.model<IComment>('Comment', CommentSchema);
