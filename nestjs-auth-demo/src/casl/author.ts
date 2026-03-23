import { User } from '../user/user';

export class Author {
  id: number;
  isAdmin: boolean;

  static fromUser(u: User): Author {
    const a = new Author();
    a.id = u.id;
    a.isAdmin = u.admin;
    return a;
  }
}
