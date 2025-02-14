import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    onConsoleLog(log: string, type: 'stdout' | 'stderr'): false | void {
      // if (type === 'stdout') return false;
    },
    setupFiles: ['dotenv/config'],
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
});
