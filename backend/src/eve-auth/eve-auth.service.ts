import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { CharacterToken } from './character-token.entity';

const EVE_TOKEN_URL = 'https://login.eveonline.com/v2/oauth/token';

interface EveJwtPayload {
  /** e.g. "CHARACTER:EVE:12345678" */
  sub: string;
  name: string;
  /** Single scope string or array of scopes. */
  scp: string | string[];
  /** Unix timestamp (seconds) when the access token expires. */
  exp: number;
}

interface EveTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

@Injectable()
export class EveAuthService {
  constructor(
    @InjectRepository(CharacterToken)
    private readonly characterTokenRepository: Repository<CharacterToken>,
    private readonly httpService: HttpService,
  ) {}

  private decodeJwtPayload(token: string): EveJwtPayload {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }
    const base64url = parts[1];
    // Convert base64url → base64 and pad to a multiple of 4
    const base64 = base64url
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(base64url.length + ((4 - (base64url.length % 4)) % 4), '=');
    return JSON.parse(
      Buffer.from(base64, 'base64').toString('utf8'),
    ) as EveJwtPayload;
  }

  /**
   * Persist an access/refresh token pair received from the frontend.
   * Decodes the access token JWT to extract character identity.
   * Safe to call multiple times for the same character — re-login updates stored tokens.
   */
  async storeTokens(
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
  ): Promise<CharacterToken> {
    const payload = this.decodeJwtPayload(accessToken);

    // sub format: "CHARACTER:EVE:<characterId>"
    const characterId = parseInt(payload.sub.split(':')[2], 10);
    if (isNaN(characterId)) {
      throw new Error('Could not parse character ID from EVE token subject');
    }

    const scopes = Array.isArray(payload.scp)
      ? payload.scp.join(' ')
      : (payload.scp ?? '');

    const expiresAt = new Date(Date.now() + expiresIn * 1000);

    const existingToken = await this.characterTokenRepository.findOne({
      where: { character_id: characterId },
    });

    if (existingToken) {
      existingToken.character_name = payload.name;
      existingToken.refresh_token = refreshToken;
      existingToken.access_token = accessToken;
      existingToken.access_token_expires_at = expiresAt;
      existingToken.scopes = scopes;

      return this.characterTokenRepository.save(existingToken);
    }

    const tokenEntity = this.characterTokenRepository.create({
      character_id: characterId,
      character_name: payload.name,
      refresh_token: refreshToken,
      access_token: accessToken,
      access_token_expires_at: expiresAt,
      scopes,
    });

    return this.characterTokenRepository.save(tokenEntity);
  }

  /**
   * Returns a valid access token for the given character, transparently refreshing
   * it if it has expired. Throws if no token for that character is stored.
   */
  async getValidAccessToken(characterId: number): Promise<string> {
    const token = await this.characterTokenRepository.findOne({
      where: { character_id: characterId },
    });

    if (!token) {
      throw new Error(`No stored token for character ${characterId}`);
    }

    // Proactively refresh 60 seconds before actual expiry
    const bufferMs = 60_000;
    const stillValid =
      token.access_token &&
      token.access_token_expires_at &&
      token.access_token_expires_at.getTime() - bufferMs > Date.now();

    if (stillValid) {
      return token.access_token!;
    }

    return this.refreshAndPersist(token);
  }

  private async refreshAndPersist(token: CharacterToken): Promise<string> {
    const clientId = process.env.EVE_CLIENT_ID;
    if (!clientId) {
      throw new Error('Missing EVE_CLIENT_ID environment variable');
    }

    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: token.refresh_token,
      client_id: clientId,
    });

    const response = await firstValueFrom(
      this.httpService.post<EveTokenResponse>(EVE_TOKEN_URL, body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }),
    );

    const { access_token, refresh_token, expires_in } = response.data;
    const expiresAt = new Date(Date.now() + expires_in * 1000);

    await this.characterTokenRepository.update(
      { character_id: token.character_id },
      {
        access_token,
        refresh_token,
        access_token_expires_at: expiresAt,
      },
    );

    return access_token;
  }

  /** Returns character metadata for all stored characters (no tokens exposed). */
  async getAllCharacters(): Promise<
    Pick<CharacterToken, 'character_id' | 'character_name' | 'scopes'>[]
  > {
    return this.characterTokenRepository.find({
      select: ['character_id', 'character_name', 'scopes'],
    });
  }
}
