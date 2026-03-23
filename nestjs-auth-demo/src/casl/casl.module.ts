import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';
import { CaslController } from './casl.controller';
import { CaslService } from './casl.service';

@Module({
  providers: [CaslAbilityFactory, CaslService],
  exports: [CaslAbilityFactory],
  controllers: [CaslController],
})
export class CaslModule {}
