/**
 * External libs
 */
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

/**
 * Local imports
 */
const { runtimeCaching } = require('./runtimeCaching')

/**
 * NextJS plugins import
 */
const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  register: false,
  skipWaiting: true,
  runtimeCaching,
  publicExcludes: ['!static/key/**/*', '!static/searchKey.opt'],
})
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

dayjs.extend(utc)
dayjs.extend(timezone)

module.exports = withPlugins([[withPWA], [withBundleAnalyzer]], {
  env: {
    buildNumber: dayjs.tz(dayjs(), 'Asia/Bangkok').format('YYYYMMDD.HH'),
  },
  api: {
    responseLimit: '20mb',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['i.nhentai.net', 't.nhentai.net'],
  },
  generateBuildId: () => 'staticRuntimeId',
  experimental: {
    reactRoot: 'concurrent',
    polyfillsOptimization: true,
    scrollRestoration: true,
    images: {
      allowFutureImage: true,
    },
    outputStandalone: !['true', '1'].includes(process.env.VERCEL ?? ''),
  },
  output: 'standalone',
})
