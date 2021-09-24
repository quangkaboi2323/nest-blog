import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Put,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { ArticleService } from './article.service';
import { CommentService } from './comment.service';
import { createArticleDTO, findOptionDTO, updateArtDTO } from './dto/article';
import { cmtDataDTO } from './dto/comment';

@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly commentService: CommentService,
  ) {}

  @Get()
  async getAllArticle(@Query() query: findOptionDTO) {
    return this.articleService.getAllArticle(query);
  }

  @Get('/me')
  async getArticleOfCurrenUser(
    @Req() req: Request,
    @Query() query: findOptionDTO,
  ) {
    query.author = req.user._id;
    return this.articleService.getAllArticle(query);
  }

  @Post()
  async createArticle(
    @Req() req: Request,
    @Body() articleData: createArticleDTO,
  ) {
    return this.articleService.createArticle(req.user._id, articleData);
  }

  @Get('/:id')
  async getDetailArticle(@Param('id') id: string) {
    return this.articleService.detailArticle(id);
  }

  @Post('/:id/like')
  async likeArticle(@Req() req: Request, @Param('id') id: string) {
    return this.articleService.likeArticle(req.user._id, id);
  }

  @Delete('/:id/like')
  async unLikeArticle(@Req() req: Request, @Param('id') id: string) {
    return this.articleService.disLikeArticle(req.user._id, id);
  }

  @Delete('/:id')
  async deleteArticle(@Param('id') id: string) {
    return this.articleService.deleteArticle(id);
  }

  @Put('/:id')
  async cmtToArticle(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() body: cmtDataDTO,
  ) {
    return this.commentService.addComment(id, req.user._id, body);
  }

  @Put('/edit/:id')
  async updateArticle(@Param('id') id: string, @Body() data: updateArtDTO) {
    return this.articleService.updateArticle(id, data);
  }
}
