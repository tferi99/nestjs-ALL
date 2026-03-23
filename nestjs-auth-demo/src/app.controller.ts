import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth-guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { HttpBasicAuthGuard } from './auth/http-basic-auth-guard';
import { HttpDigestAuthGuard } from './auth/http-digest-auth-guard';
import { HeaderApiKeyAuthGuard } from './auth/header-api-key-auth-guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // ------------------------- basic local -------------------------
  /**
   * User in post request body:
   *
   * {
   *    "username": "john",
   *    "password": "123"
   * }
   */
  @UseGuards(AuthGuard('local'))
  //@UseGuards(AuthGuard('dummy'))      // just for testing multiple 'local' strategies
  @Post('/auth/login/basic1')
  async loginBasic1(@Request() req) {
    console.log('Authenticated with loginBasic1: ' + req.user.username);
    return req.user;
  }

  /**
   * User in post request body:
   *
   * {
   *    "username": "john",
   *    "password": "123"
   * }
   */
  @UseGuards(LocalAuthGuard)
  @Post('/auth/login/basic2')
  async loginBasic2(@Request() req) {
    console.log('Authenticated with loginBasic2: ' + req.user.username);
    return req.user;
  }

  // ------------------------- http basic + digest -------------------------
  /**
   * Only works with GET?
   *
   * @param req
   */
  @UseGuards(HttpBasicAuthGuard)
  @Get('/auth/login/basic3')
  async loginBasic3(@Request() req) {
    console.log('Authenticated with loginBasic3: ' + req.user.username);
    return req.user;
  }

  /**
   * CANNOT WORK
   * Strategy not called, maybe calling method or contstructor in HttpDigestStrategy not suits to requirement.
   */
  @UseGuards(HttpDigestAuthGuard)
  @Get('/auth/login/basic4')
  async loginBasic4(@Request() req) {
    console.log('Authenticated with loginBasic4: ' + req.user.username);
    return req.user;
  }

  // ------------------------- API-header-key -------------------------
  /**
   * Put API key into X-API-KEY header parameter.
   *
   * @param req
   */
  @UseGuards(HeaderApiKeyAuthGuard)
  @Get('/auth/login/headerapikey')
  async loginHeaderApiKey(@Request() req) {
    console.log('Authenticated with loginHeaderApiKey');
    return req.user;
  }

  // ------------------------- JWT -------------------------
  /**
   * User in post request body:
   *
   * {
   *    "username": "john",
   *    "password": "123"
   * }
   */
  @UseGuards(LocalAuthGuard)
  @Post('auth/login/jwt')
  async loginJwt(@Request() req) {
    console.log('Authenticated with loginJwt: ' + req.user.username);
    return this.authService.loginForJwtToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return {
      description: 'protected resource',
      user: req.user,
    };
  }

  // ------------------------- OAuth -------------------------
  @Get('discord')
  @UseGuards(AuthGuard('discord'))
  async getUserFromDiscordLogin(@Req() req): Promise<any> {
    console.log('### Authenticated user in AuthController.getUserFromDiscordLogin():', req.user);
    return req.user;
  }
}
