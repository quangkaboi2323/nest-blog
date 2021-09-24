import { HttpException, Injectable } from '@nestjs/common';
import { IComment } from './interface/comment';
import { Comment } from './model/comment';
import { Article } from './model/article';
import { IArticle } from './interface/article';
import { cmtDataDTO } from './dto/comment';

@Injectable()
export class CommentService {
  async addComment(id: string, user: string, cmtData: cmtDataDTO) {
    const article: IArticle = await Article.findById(id);
    if (!article)
      throw new HttpException(
        { error_code: '404', error_message: 'page not found.' },
        404,
      );

    const comment: IComment = new Comment(cmtData);
    comment.idArticle = id;
    comment.author = user;
    await comment.save();

    const cmtList: IComment[] = await Comment.find({ idArticle: id });

    return { article, cmtList };
  }

  async deleteComment(id: string) {
    const comment: IComment = await Comment.findByIdAndDelete(id);

    if (!comment)
      throw new HttpException(
        { error_code: '404', error_message: 'page not found.' },
        404,
      );

    return comment;
  }

  async updateComment(id: string, body: cmtDataDTO) {
    const comment: IComment = await Comment.findByIdAndUpdate(id, body);
    if (!comment)
      throw new HttpException(
        { error_code: '404', error_message: 'page not found.' },
        404,
      );

    return comment;
  }
}
