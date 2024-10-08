// @ts-check
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true
      },
      {
        source: '/administration',
        destination: '/administration/users',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
