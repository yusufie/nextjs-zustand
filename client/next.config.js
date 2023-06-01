/** @type {import('next').NextConfig} */

module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:5000/api/:path*', // Replace with your backend server URL
        },
      ];
    },
  };
  
