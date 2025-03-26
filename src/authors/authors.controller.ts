import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from '../authors/entities/author.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('authors')
@UseGuards(AuthGuard) // Har bir endpoint autentifikatsiyani talab qiladi
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  create(@Body('name') name: string, @Body('bio') bio?: string): Promise<Author> {
    return this.authorsService.create(name, bio);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter?: string,
  ): Promise<{ data: Author[]; total: number }> {
    return this.authorsService.findAll(page, limit, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Author> {
    return this.authorsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('name') name?: string,
    @Body('bio') bio?: string,
  ): Promise<Author> {
    return this.authorsService.update(+id, name, bio);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.authorsService.remove(+id);
  }
}