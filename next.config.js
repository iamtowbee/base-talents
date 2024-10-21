const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig