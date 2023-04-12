/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["van-bucket.s3.ap-southeast-1.amazonaws.com"],
  },
};

module.exports = nextConfig;
