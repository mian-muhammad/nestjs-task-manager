import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  HttpException,
  HttpStatus,
  Catch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create-user-dto';

@Controller()
@Catch()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() createUserDto: CreateUserDto): Promise<any> {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'username already exits.',
        },
        HttpStatus.CONFLICT,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
