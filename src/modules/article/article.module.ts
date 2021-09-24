import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from '../auth/auth.middleware';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { CommentService } from './comment.service';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, CommentService],
})
export class ArticleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ArticleController);
  }
}
