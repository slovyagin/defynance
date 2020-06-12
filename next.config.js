const appConfig = require('./app.config.json')
const isProd = process.env.NODE_ENV === 'production'

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})

module.exports = withMDX({
  assetPrefix: isProd ? appConfig.url : '',
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  webpack (config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/
      },
      use: {
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: {
              removeTitle: false
            }
          }
        }
      }
    })

    return config
  }
})
