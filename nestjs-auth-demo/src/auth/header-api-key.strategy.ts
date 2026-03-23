import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-headerapikey';
import { API_KEY } from './auth-constants';

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor() {
    super({ header: 'X-API-KEY', prefix: '' }, true, async (apiKey, done) => {
      console.log('HeaderApiKeyStrategy passReqToCallback');
      return this.validate(apiKey, done);
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public validate = (apiKey: string, done: (error: Error, data) => {}) => {
    console.log('HeaderApiKeyStrategy validate()');
    if (API_KEY === apiKey) {
      done(null, true);
    }
    done(new UnauthorizedException(), null);
  };
}
