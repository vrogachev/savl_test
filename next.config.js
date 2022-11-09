const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  webpack: (config, { webpack, isServer, dev }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {
            extract: false,
            symbolId: "icon-[name]",
            publicPath: '/',
            outputPath: path.join(process.cwd(), 'public', 'icons'),
            spriteFilename: svgPath => `sprite${svgPath.substr(-4)}`
          }
        }
      ]
    });
    return config;
  }
}

module.exports = nextConfig
