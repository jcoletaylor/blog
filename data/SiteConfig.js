const config = {
  siteTitle: 'Green Mountain', // Site title.
  siteTitleShort: 'Green Mountain', // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: 'Green Mountain', // Alternative site title for SEO.
  siteLogo: '/logos/mountains.svg', // Logo used for SEO and manifest.
  siteUrl: 'https://greenmountain.blog', // Domain of your website without pathPrefix.
  pathPrefix: '', // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: 'Thoughts on Zen, Hiking, Politics, Plants, and Software', // Website description used for RSS feeds/meta description tag.
  siteRss: '/rss.xml', // Path to the RSS file.
  siteFBAppID: '12345', // FB Application ID for using app insights
  googleAnalyticsID: 'UA-56164127-1', // GA tracking ID.
  dateFromFormat: 'YYYY-MM-DD', // Date format used in the frontmatter.
  dateFormat: 'YYYY/MM/DD', // Date format for display.
  userName: 'Pete Taylor', // Username to display in the author segment.
  userEmail: 'pete.jc.taylor@hey.com', // Email used for RSS feed's author segment
  userTwitter: 'zen_commie', // Optionally renders "Follow Me" in the Bio segment.
  userGitHub: 'jcoletaylor', // Optionally renders "Follow Me" in the Bio segment.
  userLocation: 'Gainesville, FL', // User location to display in the author segment.
  userAvatar: 'https://s.gravatar.com/avatar/a1fa99511b4b0b4fd3fb928d040d8a3d?s=80', // User avatar to display in the author segment.
  userDescription: "Thinking about Zen, Hiking, Politics, Plants, and Software", // User description to display in the author segment.
  copyright: 'Creative Commons v4 with attribution', // Copyright string for the footer of the website and RSS feed.
  themeColor: '#c62828', // Used for setting manifest and progress theme colors.
  backgroundColor: 'red' // Used for setting manifest background color.
}

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === '/') {
  config.pathPrefix = ''
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, '')}`
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === '/')
  config.siteUrl = config.siteUrl.slice(0, -1)

// Make sure siteRss has a starting forward slash
// if (config.siteRss && config.siteRss[0] !== "/")
//   config.siteRss = `/${config.siteRss}`;

module.exports = config
