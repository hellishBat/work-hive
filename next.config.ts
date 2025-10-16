import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

// /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   // Your existing config (e.g., for Tailwind, images, etc.)
// // }

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
          },
        },
      ],
    })
    return config
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
            },
          },
        ],
        as: '*.js',
      },
    },
  },
}

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

export default withNextIntl(nextConfig)
