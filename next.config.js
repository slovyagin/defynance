const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})

module.exports = withMDX({
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
