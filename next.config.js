/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [process.env.AWS_S3_HOST_NAME],
  },
};

module.exports = nextConfig;
