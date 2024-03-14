import { Body, Controller, HttpStatus, Next, Post, Res } from '@nestjs/common';
import { NextFunction, Response } from 'express';

import { AuthService } from './auth.service';
import { customError } from 'src/utils/exceptionHandler';
import { ApiResponse } from 'src/utils/apiResponse';
import { loginUserDto } from './dtos/loginUserDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: loginUserDto,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const user = await this.authService.validateUser(
        body.email,
        body.password,
      );
      if (!user)
        throw new customError(
          HttpStatus.UNAUTHORIZED,
          'Invalid credentials',
          'User not found or invalid password',
        );

      const tokenResponse = await this.authService.login(
        body.email,
        body.password,
      );
      if (tokenResponse instanceof customError) {
        throw tokenResponse;
      }
      return new ApiResponse(
        HttpStatus.OK,
        'Login successful',
        tokenResponse,
        res,
      );
    } catch (error) {
      next(error);
    }
  }
}
