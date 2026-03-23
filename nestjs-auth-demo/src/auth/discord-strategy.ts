import { PassportStrategy } from '@nestjs/passport';
import { HttpService, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-oauth2';
import { stringify } from 'querystring';

// change these to be your Discord client ID and secret
const clientID = '834168627363840020';
const clientSecret = 'iLNNYZZQ-VpdpEpueAQ2G6bpVEDhDfxD';
const callbackURL = 'http://localhost:8080/auth/discord';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(private authService: AuthService, private http: HttpService) {
    super({
      authorizationURL:
        'https://discord.com/api/oauth2/authorize?client_id=834168627363840020&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fdiscord&response_type=code&scope=identify%20email%20connections%20guilds%20guilds.join',
      /*			authorizationURL: `https://discordapp.com/api/oauth2/authorize?${ stringify({
              client_id    : clientID,
              redirect_uri : callbackURL,
              response_type: 'code',
              scope        : 'identify',
            }) }`,*/
      tokenURL: 'https://discordapp.com/api/oauth2/token',
      scope: 'identify',
      clientID,
      clientSecret,
      callbackURL,
    });
  }

  async validate(accessToken: string): Promise<any> {
    console.log(`### DiscordStrategy.validate(accessToken:${accessToken}`);

    const { data } = await this.http
      .get('https://discordapp.com/api/users/@me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .toPromise();

    console.log('### Data from discord: ', data);

    return this.authService.findUserFromDiscordId(data.id);
  }
}
