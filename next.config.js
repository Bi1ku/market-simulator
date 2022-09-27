/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'placeholder.com',
      'www.google.com',
      'cdn3.iconfinder.com',
      'github.githubassets.com',
      'www.clipartmax.com',
      'asset.brandfetch.io',
    ],
  },
  env: {
    BRANDFETCH_API_KEY: process.env.BRANDFETCH_API_KEY,
  },
};

module.exports = nextConfig;
