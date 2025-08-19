/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.광탈페.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin']
      }
    ]
  }
}