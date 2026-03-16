import styled, { keyframes } from "styled-components";
import { useEffect, useMemo, useRef, useState } from "react";
import { ServerStatus } from "./ServerStatus";
import { theme } from "./style/theme";
import {
  clearStoredEveTokens,
  completeEveSsoLoginFromRedirect,
  getStoredEveTokens,
  startEveSsoLogin,
  type EveTokens,
} from "./utils/eveSso";

const BgAnim = keyframes`
from {
  background-position: left;
} 
to {
  background-position: right;
}
`;

const Container = styled.div`
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.emGrey};
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  background-image: linear-gradient(
    315deg,
    #e9e9e9 45%,
    ${theme.colors.orange} 50%,
    #e9e9e9 55%
  );
  background-size: 900%;
  background-clip: text;
  color: transparent;
  animation: ${BgAnim} 15s infinite;
  margin: 0;
  font-family: Orbitron;
`;

const AuthActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const EveButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.orange};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.emDarkGrey};
  color: ${({ theme }) => theme.colors.emWhite};
  padding: 6px 12px;
  font-family: Orbitron;
  cursor: pointer;
  transition: background-color 200ms ease;

  &:hover:not(:disabled),
  &:focus-visible:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.emBlack};
  }

  &:disabled {
    cursor: wait;
    opacity: 0.7;
  }
`;

const SecondaryButton = styled(EveButton)`
  border-color: ${({ theme }) => theme.colors.emLightGrey};
  font-family: inherit;
  padding: 6px 10px;
`;

const AuthLabel = styled.span`
  color: ${({ theme }) => theme.colors.emWhite};
  font-size: 0.9rem;
`;

const AuthError = styled.p`
  color: #ffd1d1;
  font-size: 0.85rem;
  margin-top: 6px;
`;

function isTokenExpired(tokens: EveTokens): boolean {
  const expiresAt = tokens.receivedAt + tokens.expiresIn * 1000;
  return Date.now() >= expiresAt;
}

export function Header() {
  const [tokens, setTokens] = useState<EveTokens | null>(() =>
    getStoredEveTokens(),
  );
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const loginAttempted = useRef(false);

  useEffect(() => {
    async function completeLoginIfNeeded(): Promise<void> {
      const callbackParams = new URLSearchParams(window.location.search);
      const hasCallbackData =
        callbackParams.has("code") ||
        callbackParams.has("state") ||
        callbackParams.has("error");

      if (!hasCallbackData || loginAttempted.current) {
        return;
      }
      loginAttempted.current = true;

      setIsLoadingAuth(true);

      try {
        const refreshedTokens = await completeEveSsoLoginFromRedirect();

        if (refreshedTokens) {
          setTokens(refreshedTokens);
          setAuthError(null);
        }
      } catch (error) {
        if (error instanceof Error) {
          setAuthError(error.message);
        } else {
          setAuthError("EVE SSO login failed unexpectedly");
        }
      } finally {
        setIsLoadingAuth(false);
      }
    }

    void completeLoginIfNeeded();
  }, []);

  const isConnected = useMemo(() => {
    if (!tokens) {
      return false;
    }

    return !isTokenExpired(tokens);
  }, [tokens]);

  async function handleEveLogin(): Promise<void> {
    setAuthError(null);
    setIsLoadingAuth(true);

    try {
      await startEveSsoLogin();
    } catch (error) {
      setIsLoadingAuth(false);

      if (error instanceof Error) {
        setAuthError(error.message);
        return;
      }

      setAuthError("Unable to start EVE SSO login");
    }
  }

  function handleDisconnect(): void {
    clearStoredEveTokens();
    setTokens(null);
    setAuthError(null);
  }

  return (
    <Container>
      <TopRow>
        <Title>EVE Magnate</Title>
        <AuthActions>
          <EveButton onClick={handleEveLogin} disabled={isLoadingAuth}>
            {isConnected
              ? "Re-auth with EVE"
              : isLoadingAuth
                ? "Connecting..."
                : "Log in with EVE Online"}
          </EveButton>
          {isConnected && (
            <>
              <AuthLabel>Saved to backend</AuthLabel>
              <SecondaryButton onClick={handleDisconnect}>
                Disconnect
              </SecondaryButton>
            </>
          )}
        </AuthActions>
      </TopRow>
      {authError && <AuthError>{authError}</AuthError>}
      <ServerStatus />
    </Container>
  );
}
