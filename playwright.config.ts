import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  timeout: 10000,
  webServer: {
    url: 'http://localhost:5173',
    command: 'pnpm prepare:e2e',
  },
  use: {
    headless: true,
  },
}

export default config
