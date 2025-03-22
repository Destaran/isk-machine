import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'https://esi.evetech.net/latest/swagger.json',
  output: 'src/client',
  plugins: ['@hey-api/client-axios'],
});
