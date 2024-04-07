import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getListOfAPI(): { [key: string]: string } {
    return {
      activities: 'A CRUD API for managing user activity in the app',
      boards: 'A CRUD API for managing boards in the app',
      lists: 'A CRUD API for managing lists in the app',
    };
  }
}
