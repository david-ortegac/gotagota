import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.front',
  appName: 'front',
  webDir: 'www/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
