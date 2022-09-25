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
    ],
  },
};

module.exports = nextConfig;
