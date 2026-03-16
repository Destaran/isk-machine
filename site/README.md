# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

## EVE SSO frontend setup

The header includes a `Log in with EVE Online` button using EVE SSO Authorization Code with PKCE.

Set the following Vite env variables in `.env.local`:

```bash
VITE_EVE_CLIENT_ID=your_app_client_id
VITE_EVE_SSO_REDIRECT_URI=http://localhost:5173/
VITE_EVE_SSO_SCOPES=esi-wallet.read_character_wallet.v1 esi-assets.read_assets.v1
```

Notes:

- `VITE_EVE_CLIENT_ID` is required.
- `VITE_EVE_SSO_REDIRECT_URI` must exactly match a redirect URL configured in your EVE developer application.
- `VITE_EVE_SSO_SCOPES` can be space- or comma-separated.
- Access/refresh tokens are currently stored in browser local storage for frontend-only development.
