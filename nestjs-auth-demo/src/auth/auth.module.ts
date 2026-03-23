import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalBasicStrategy } from './local-basic-strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth-constants';
import { JwtStrategy } from './jwt-strategy';
import { DummyStrategy } from './dummy-strategy';
import { HttpDigestStrategy } from './http-digest-strategy';
import { HttpBasicStrategy } from './http-basic-strategy';
import { HeaderApiKeyStrategy } from './header-api-key.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    LocalBasicStrategy,
    HttpBasicStrategy,
    HttpDigestStrategy,
    JwtStrategy,
    DummyStrategy,
    HeaderApiKeyStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
