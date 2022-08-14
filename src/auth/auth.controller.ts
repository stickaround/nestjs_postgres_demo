import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { AuthCredentials } from './dto/authCredentials.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() credentials: AuthCredentials) {
    return this.authService.login(credentials);
  }

  @Post('register')
  async register(@Body() credentials: AuthCredentials, @Res() res: Response) {
    const user = await this.authService.register(credentials);
    return res.status(HttpStatus.CREATED).json(user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.ACCEPTED).json(req.user);
  }
}
