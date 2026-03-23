import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { HttpBasicStrategy } from './http-basic-strategy';

@Module({
  imports: [PassportModule],
  providers: [AuthService, HttpBasicStrategy],
  exports: [AuthService],
})
export class AuthModule {}
