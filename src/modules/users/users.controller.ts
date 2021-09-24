import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UserDTO } from './dto/dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUser() {
    return this.usersService.getAllUser();
  }

  @Get('/me')
  async getCurrentUser(@Req() req: Request) {
    console.log(req.user);
    return this.usersService.getUserById(req.user._id);
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Put('/me')
  async editProfile(@Req() req: Request, @Body() userData: UserDTO) {
    console.log(userData);
    return this.usersService.updateUser(req.user._id, userData);
  }

  @Delete('/me')
  async deleteMyAccount(@Req() req: Request) {
    return this.usersService.deleteUser(req.user._id);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Post('/:id/follow')
  async followUser(@Req() req: Request, @Param('id') userId: string) {
    return this.usersService.followUser(req.user._id, userId);
  }

  @Delete('/:id/follow')
  async unFollowUser(@Req() req: Request, @Param('id') userId: string) {
    return this.usersService.unFollowUser(req.user._id, userId);
  }
}
