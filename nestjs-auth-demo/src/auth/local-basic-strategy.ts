import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalBasicStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log(`--> LocalBasicStrategy.validate(username:${username}, password:${password})`);

    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log('User retrieved:', user);
    return user;
  }
}
