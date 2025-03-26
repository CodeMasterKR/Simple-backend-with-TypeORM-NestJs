import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('books')
@UseGuards(AuthGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(
    @Body('title') title: string,
    @Body('isbn') isbn: string,
    @Body('userId') userId: number,
    @Body('authorId') authorId: number,
  ): Promise<Book> {
    return this.booksService.create(title, isbn, userId, authorId);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter?: string,
  ): Promise<{ data: Book[]; total: number }> {
    return this.booksService.findAll(page, limit, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('title') title?: string,
    @Body('isbn') isbn?: string,
    @Body('userId') userId?: number,
    @Body('authorId') authorId?: number,
  ): Promise<Book> {
    return this.booksService.update(+id, title, isbn, userId, authorId);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(+id);
  }
}