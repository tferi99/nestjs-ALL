import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // for basic auth
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // for JWT
  async loginForJwtToken(user: any) {
    console.log('--> loginForJwtToken()', user);
    const payload = { username: user.username, sub: user.userId };

    // checking user in auth DB
    // ....

    const access_token = this.jwtService.sign(payload); // generating JWT from subset of user
    console.log('Generated JWT:', access_token);

    return {
      access_token,
    };
  }

  async findUserFromDiscordId(discordId: string): Promise<any> {
    const user = await this.usersService.findOneDiscordUser('discord_id', discordId);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
