import { HttpException, Injectable } from '@nestjs/common';
import { IUser } from '../users/interface';
import { User } from '../users/model';
import { createArticleDTO, findOptionDTO, updateArtDTO } from './dto/article';
import { IArticle } from './interface/article';
import { Article } from './model/article';
import { Comment } from './model/comment';

@Injectable()
export class ArticleService {
  async getAllArticle(queryOption: findOptionDTO) {
    let articles: IArticle[] = await Article.find();

    if (queryOption.author)
      articles = articles.filter(
        (item: IArticle) => item.author === queryOption.author,
      );

    if (queryOption.categories)
      articles = articles.filter((item: IArticle) =>
        item.categories.includes(queryOption.categories),
      );

    // console.log(response)
    return articles;
  }

  async createArticle(user, articleData: createArticleDTO) {
    const article: IArticle = new Article(articleData);
    article.author = user;
    article.save();

    const author: IUser = await User.findById(user);

    const response: IArticle = article;
    response.author = author.username;

    return response;
  }

  async detailArticle(id: string) {
    const article: IArticle = await Article.findById(id);
    if (!article)
      throw new HttpException(
        { error_code: '404', error_message: 'Article not found' },
        404,
      );
    const comment = await Comment.find({ idArticle: id });

    return { article, comment };
  }

  async likeArticle(currentUser: string, id: string) {
    const article: IArticle = await Article.findById(id);

    if (!article)
      throw new HttpException(
        { error_code: '404', error_message: 'Article not found' },
        404,
      );

    if (article.favorite.includes(currentUser)) return article;

    await article.favorite.push(currentUser);
    await article.save();

    const user: IUser = await User.findById(currentUser);
    await user.favorites.push(id);
    user.save();

    return this.detailArticle(id);
  }

  async disLikeArticle(currentUser: string, id: string) {
    const article: IArticle = await Article.findById(id);

    if (!article)
      throw new HttpException(
        { error_code: '404', error_message: 'Article not found' },
        404,
      );

    if (!article.favorite.includes(currentUser)) return article;

    article.favorite = article.favorite.filter((like) => like != currentUser);
    await article.save();

    const user: IUser = await User.findById(currentUser);
    user.favorites = user.favorites.filter((u) => u != id);
    user.save();

    return this.detailArticle(id);
  }

  async updateArticle(id: string, articleData: updateArtDTO) {
    const article: IArticle = await Article.findByIdAndUpdate(id, articleData);
    if (!article)
      throw new HttpException(
        { error_code: '404', error_message: 'Page not found' },
        404,
      );

    console.log(articleData);

    return await Article.findById(id);
  }

  async deleteArticle(id: string) {
    const article = await Article.findByIdAndDelete(id);
    if (!article)
      throw new HttpException(
        { error_code: '404', error_message: 'Page not found' },
        404,
      );

    await Comment.deleteMany({ idArticle: id });

    return article;
  }
}
