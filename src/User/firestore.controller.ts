import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FirestoreService } from './firestore.service';

@Controller('users')
export class UsersController {
  constructor(private firestoreService: FirestoreService) {}

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<any> {
    return this.firestoreService.getUser(userId);
  }

  @Post()
  async createUser(@Body() userData: any): Promise<void> {
    await this.firestoreService.createUser(userData);
  }
}
