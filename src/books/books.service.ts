import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { AuthService } from '../auth/auth.service';
import { AuthorsService } from '../authors/authors.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    private authService: AuthService,
    private authorsService: AuthorsService,
  ) {}

  async create(title: string, isbn: string, userId: number, authorId: number): Promise<Book> {
    const user = await this.authService.findOne(userId);
    const author = await this.authorsService.findOne(authorId);
    const book = this.booksRepository.create({ title, isbn, user, author });
    return this.booksRepository.save(book);
  }

  async findAll(page: number = 1, limit: number = 10, filter?: string): Promise<{ data: Book[]; total: number }> {
    const query = this.booksRepository.createQueryBuilder('book')
      .leftJoinAndSelect('book.user', 'user')
      .leftJoinAndSelect('book.author', 'author');

    if (filter) {
      query.where('book.title LIKE :filter', { filter: `%${filter}%` });
    }

    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total };
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['user', 'author'],
    });
    if (!book) throw new NotFoundException(`Book with ID ${id} not found`);
    return book;
  }

  async update(id: number, title?: string, isbn?: string, userId?: number, authorId?: number): Promise<Book> {
    const book = await this.findOne(id);
    if (title) book.title = title;
    if (isbn) book.isbn = isbn;
    if (userId) book.user = await this.authService.findOne(userId);
    if (authorId) book.author = await this.authorsService.findOne(authorId);
    return this.booksRepository.save(book);
  }

  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    await this.booksRepository.remove(book);
  }
}