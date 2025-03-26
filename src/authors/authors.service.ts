import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../authors/entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  async create(name: string, bio?: string): Promise<Author> {
    const author = this.authorsRepository.create({ name, bio });
    return this.authorsRepository.save(author);
  }

  async findAll(page: number = 1, limit: number = 10, filter?: string): Promise<{ data: Author[]; total: number }> {
    const query = this.authorsRepository.createQueryBuilder('author');

    if (filter) {
      query.where('author.name LIKE :filter', { filter: `%${filter}%` });
    }

    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total };
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorsRepository.findOneBy({ id });
    if (!author) throw new NotFoundException(`Author with ID ${id} not found`);
    return author;
  }

  async update(id: number, name?: string, bio?: string): Promise<Author> {
    const author = await this.findOne(id);
    if (name) author.name = name;
    if (bio !== undefined) author.bio = bio; 
    return this.authorsRepository.save(author);
  }

  async remove(id: number): Promise<void> {
    const author = await this.findOne(id);
    await this.authorsRepository.remove(author);
  }
}