/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["puppeteer", "@sparticuz/chromium"],
  },
};

export default nextConfig;
