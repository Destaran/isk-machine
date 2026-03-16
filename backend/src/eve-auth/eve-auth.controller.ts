import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { EveAuthService } from './eve-auth.service';

class StoreTokensDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

@Controller('eve-auth')
export class EveAuthController {
  constructor(private readonly eveAuthService: EveAuthService) {}

  /**
   * Called by the frontend after a successful EVE SSO login.
   * Persists the tokens so the backend can make authenticated ESI calls autonomously.
   */
  @Post('tokens')
  @HttpCode(201)
  async storeTokens(@Body() dto: StoreTokensDto) {
    const token = await this.eveAuthService.storeTokens(
      dto.accessToken,
      dto.refreshToken,
      dto.expiresIn,
    );
    return {
      characterId: token.character_id,
      characterName: token.character_name,
    };
  }

  /** Returns all characters whose tokens are stored (safe — no token values included). */
  @Get('characters')
  async getCharacters() {
    return this.eveAuthService.getAllCharacters();
  }
}
