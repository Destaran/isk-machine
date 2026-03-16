import { post } from "../api/API";

const EVE_AUTH_URL = "https://login.eveonline.com/v2/oauth/authorize";
const EVE_TOKEN_URL = "https://login.eveonline.com/v2/oauth/token";

const STATE_KEY = "eve_sso_state";
const VERIFIER_KEY = "eve_sso_verifier";
const TOKENS_KEY = "eve_sso_tokens";

export interface EveTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
  receivedAt: number;
}

interface EveTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

interface SavedCharacterResponse {
  characterId: number;
  characterName: string;
}

function base64UrlEncode(bytes: Uint8Array): string {
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join(
    "",
  );
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function randomString(byteLength = 32): string {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return base64UrlEncode(bytes);
}

async function sha256(input: string): Promise<Uint8Array> {
  const encoded = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return new Uint8Array(digest);
}

async function createPkcePair(): Promise<{
  verifier: string;
  challenge: string;
}> {
  const verifier = randomString(32);
  const challengeBytes = await sha256(verifier);
  const challenge = base64UrlEncode(challengeBytes);
  return { verifier, challenge };
}

function getClientId(): string {
  const clientId = import.meta.env.VITE_EVE_CLIENT_ID;
  if (!clientId) {
    throw new Error("Missing VITE_EVE_CLIENT_ID environment variable");
  }

  return clientId;
}

function getRequestedScopes(): string {
  const configuredScopes = import.meta.env.VITE_EVE_SSO_SCOPES;
  if (!configuredScopes) {
    return "";
  }

  const normalizedValue = configuredScopes.trim();

  // Support JSON array syntax from env, e.g. ["scope.a","scope.b"]
  if (normalizedValue.startsWith("[") && normalizedValue.endsWith("]")) {
    try {
      const parsed = JSON.parse(normalizedValue) as unknown;
      if (Array.isArray(parsed)) {
        return parsed
          .filter((scope): scope is string => typeof scope === "string")
          .map((scope) => scope.trim())
          .filter(Boolean)
          .join(" ");
      }
    } catch {
      // Fall back to delimiter parsing below.
    }
  }

  return normalizedValue
    .split(/[\s,]+/)
    .map((scope) => scope.trim())
    .filter(Boolean)
    .join(" ");
}

function getRedirectUri(): string {
  return (
    import.meta.env.VITE_EVE_SSO_REDIRECT_URI ?? `${window.location.origin}/`
  );
}

function storeTokens(tokens: EveTokens): void {
  localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
}

async function persistTokens(
  tokens: EveTokens,
): Promise<SavedCharacterResponse> {
  return post<SavedCharacterResponse>("/eve-auth/tokens", {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    expiresIn: tokens.expiresIn,
  });
}

export function getStoredEveTokens(): EveTokens | null {
  const raw = localStorage.getItem(TOKENS_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as EveTokens;
  } catch {
    localStorage.removeItem(TOKENS_KEY);
    return null;
  }
}

export function clearStoredEveTokens(): void {
  localStorage.removeItem(TOKENS_KEY);
}

export async function startEveSsoLogin(): Promise<void> {
  const clientId = getClientId();
  const scopes = getRequestedScopes();
  const redirectUri = getRedirectUri();

  const { verifier, challenge } = await createPkcePair();
  const state = randomString(16);

  sessionStorage.setItem(STATE_KEY, state);
  sessionStorage.setItem(VERIFIER_KEY, verifier);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
  });

  if (scopes) {
    params.set("scope", scopes);
  }

  window.location.assign(`${EVE_AUTH_URL}?${params.toString()}`);
}

function clearOauthParamsFromUrl(): void {
  const nextUrl = `${window.location.origin}${window.location.pathname}${window.location.hash}`;
  window.history.replaceState({}, document.title, nextUrl);
}

export async function completeEveSsoLoginFromRedirect(): Promise<EveTokens | null> {
  const urlParams = new URLSearchParams(window.location.search);
  const authCode = urlParams.get("code");
  const returnedState = urlParams.get("state");
  const oauthError = urlParams.get("error");
  const oauthErrorDescription = urlParams.get("error_description");

  if (oauthError) {
    clearOauthParamsFromUrl();
    throw new Error(oauthErrorDescription ?? oauthError);
  }

  if (!authCode || !returnedState) {
    return null;
  }

  const expectedState = sessionStorage.getItem(STATE_KEY);
  const verifier = sessionStorage.getItem(VERIFIER_KEY);

  sessionStorage.removeItem(STATE_KEY);
  sessionStorage.removeItem(VERIFIER_KEY);

  if (!expectedState || expectedState !== returnedState || !verifier) {
    clearOauthParamsFromUrl();
    throw new Error("Failed state validation while handling EVE SSO callback");
  }

  const clientId = getClientId();
  const payload = new URLSearchParams({
    grant_type: "authorization_code",
    code: authCode,
    client_id: clientId,
    code_verifier: verifier,
  });

  const response = await fetch(EVE_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload,
  });

  const data = (await response.json()) as Partial<EveTokenResponse> & {
    error?: string;
    error_description?: string;
  };

  if (
    !response.ok ||
    !data.access_token ||
    !data.refresh_token ||
    !data.expires_in ||
    !data.token_type
  ) {
    clearOauthParamsFromUrl();
    throw new Error(
      data.error_description ??
        data.error ??
        "Failed to exchange EVE authorization code for tokens",
    );
  }

  const tokens: EveTokens = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
    tokenType: data.token_type,
    receivedAt: Date.now(),
  };

  try {
    await persistTokens(tokens);
  } catch (error) {
    clearOauthParamsFromUrl();

    if (error instanceof Error) {
      throw new Error(
        `Failed to save EVE login on the backend: ${error.message}`,
      );
    }

    throw new Error("Failed to save EVE login on the backend");
  }

  storeTokens(tokens);
  clearOauthParamsFromUrl();

  return tokens;
}
