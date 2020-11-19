const CleanCSS = require('clean-css');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const fs = require('fs');

module.exports = (config) => {
  // Add navigation plugin
  config.addPlugin(eleventyNavigationPlugin);

  // Deep data merge
  config.setDataDeepMerge(true);

  // Syntax Highlight
  config.addPlugin(syntaxHighlight);

  // Get Blyth Css
  config.addFilter('blythcss', function (file) {
    const data = fs.readFileSync(`./node_modules/blyth-css/src/utility/css/${file}.css`, 'utf8');
    return data;
  });

  // Minify css
  config.addFilter('cssmin', function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Add items
  config.addPlugin(pluginRss);

  // Pass through
  config.addPassthroughCopy('./src/_redirects');
  config.addPassthroughCopy('./src/img/');
  config.addPassthroughCopy('./src/js');
  config.addPassthroughCopy('./src/fonts/');
  config.addPassthroughCopy('./src/apple-touch-icon-57x57.png');
  config.addPassthroughCopy('./src/apple-touch-icon-72x72.png');
  config.addPassthroughCopy('./src/apple-touch-icon-76x76.png');
  config.addPassthroughCopy('./src/apple-touch-icon-114x114.png');
  config.addPassthroughCopy('./src/apple-touch-icon-152x152.png');
  config.addPassthroughCopy('./src/apple-touch-icon-180x180.png');
  config.addPassthroughCopy('./src/apple-touch-icon.png');
  config.addPassthroughCopy('./src/favicon.ico');
  config.addPassthroughCopy('./src/robots.txt');

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    passthroughFileCopy: true,
  };
};