import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DecoModule } from './deco/deco.module';
import { GrdModule } from './grd/grd.module';
import { AuthModule } from './auth/auth.module';
import { DecisionModule } from './decision/decision.module';

@Module({
  imports: [DecoModule, GrdModule, AuthModule, DecisionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
