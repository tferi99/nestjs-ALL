import { Injectable } from '@nestjs/common';
import { User } from './user';
import * as _ from 'lodash';

const USERS: User[] = [
  {
    id: 1,
    username: 'admin',
    password: '123',
    name: 'Admin',
    email: 'admin@test.org',
    admin: true,
  },
  {
    id: 10,
    username: 'elek',
    password: '123',
    name: 'Segg Elek',
    email: 'se@test.org',
    admin: false,
  },
  {
    id: 12,
    username: 'john',
    password: '123',
    name: 'John Smith',
    email: 'js@test.org',
    admin: false,
  },
];

@Injectable()
export class AuthService {
  // for basic auth
  async validateUser(username: string, pass: string): Promise<any> {
    const user = this.getUserByUserName(username);
    if (!user) {
      console.log(username + ' : user not found');
    }
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    console.log('Bad password for user: ' + username);
    return null;
  }

  getUser(id: number): User {
    return _.find(USERS, { id });
  }

  getUserByUserName(username: string): User {
    return _.find(USERS, { username });
  }
}
