import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterToken } from './character-token.entity';
import { EveAuthController } from './eve-auth.controller';
import { EveAuthService } from './eve-auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([CharacterToken]), HttpModule],
  controllers: [EveAuthController],
  providers: [EveAuthService],
  exports: [EveAuthService],
})
export class EveAuthModule {}
