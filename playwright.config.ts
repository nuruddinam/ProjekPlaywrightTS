import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// 🟢 AKTIFKAN PENGATURAN .ENV
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    // 🟢 Ambil URL utama dari .env, atau jadikan emra.chat sebagai default
    baseURL: process.env.BASE_URL || 'https://www.emra.chat', 

    screenshot: 'only-on-failure', // Hanya ambil gambar saat gagal
    video: 'retain-on-failure',   // Hanya rekam video saat gagal
    trace: 'retain-on-failure',   // 🟢 Trace viewer otomatis aktif di lokal jika test failed
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});