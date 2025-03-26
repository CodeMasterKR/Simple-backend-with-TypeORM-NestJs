import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entities/book.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthorsModule } from '../authors/authors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), AuthModule, AuthorsModule],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}