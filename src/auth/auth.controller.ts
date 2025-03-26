import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Roles } from '../common/roles.decorator';
import { RoleGuard } from './role.guard';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body('username') username: string, @Body('password') password: string) {
    return this.authService.register(username, password);
  }

  @Post('login')
  login(@Body('username') username: string, @Body('password') password: string) {
    return this.authService.login(username, password);
  }

  @Get('users')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN') 
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter?: string,
  ): Promise<{ data: User[]; total: number }> {
    return this.authService.findAll(page, limit, filter);
  }
}