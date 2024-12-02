import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { ArticlesModule } from './articles/articles.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { KidsModule } from './kids/kids.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    InstitutionsModule,
    ArticlesModule,
    DatabaseModule,
    KidsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
