import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { DigestStrategy as Strategy } from 'passport-http';

@Injectable()
export class HttpDigestStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
/*    super({ header: 'X-API-KEY', prefix: '' }, true, async (apiKey, done) => {
      console.log('HeaderApiKeyStrategy passReqToCallback');
      return this.validate(apiKey, done);
    });*/
  }

  public validate = async (req, username, password): Promise<boolean> => {
    console.log(`HttpDigestStrategy.validate(username:${username}, password:${password})`);
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  };
}
