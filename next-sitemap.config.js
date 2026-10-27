/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://kvint.agency',
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/privacy', '/icon.svg', '/opengraph-image', '/opengraph-image*', '/cases/premium-grey-zone', '/blog/seo-2024'],
}
