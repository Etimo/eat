const { withExpo } = require('@expo/next-adapter');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: [
    'react-native',
    'react-native-pie-chart',
    'react-native-safe-area-context',
    'react-native-web',
    'lucide-react-native',
    'solito',
    'shared',
    'react-native-reanimated',
    '@expo/html-elements',
    'react-native-gesture-handler',
  ],
};

module.exports = withExpo(nextConfig);
