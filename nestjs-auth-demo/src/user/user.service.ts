import { Injectable } from '@nestjs/common';
import { User } from './user';

export type DiscordUser = any;

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'admin',
      password: 'admin',
      admin: true,
    },
    {
      id: 1,
      username: 'john',
      password: '123',
      admin: true,
    },
    {
      id: 2,
      username: 'maria',
      password: '456',
      admin: false,
    },
  ];

  private readonly discordUsers = [
    {
      userId: 0,
      name: 'FToth from demo app',
      discord_id: '426324681910517760',
      admin: false,
    },
    {
      userId: 1,
      name: 'bob',
      discord_id: '1234sfaf',
      admin: false,
    },
    {
      userId: 2,
      name: 'jeff',
      discord_id: 't4ege4yhesyhe',
      admin: false,
    },
    {
      userId: 3,
      name: 'maria',
      discord_id: 'erh5ree45',
      admin: false,
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findOneDiscordUser(field: string, discordId: string): Promise<User | undefined> {
    console.log(`### UsersService.findOne(field:${field},discordId:${discordId}) - looking for user`);
    const u = this.users.find(user => user[field] === discordId);
    if (u) {
      console.info('### UsersService.findOne() - user found:', u);
    } else {
      console.error('### UsersService.findOne() - User not found');
    }
    return u;
  }
}
