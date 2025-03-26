import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../auth/user.entity';
import { Author } from '../../authors/entities/author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  isbn: string;

  @ManyToOne(() => User, (user) => user.books)
  user: User;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
}