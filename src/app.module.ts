import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ArticleModule } from './modules/article/article.module';
import { CommentService } from './modules/article/comment.service';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
    imports: [DatabaseModule, UsersModule, AuthModule, ArticleModule],
    controllers: [AppController],
    providers: [AppService, CommentService]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
