/** @type {import('next').NextConfig} */
// Static-export config for GitHub Pages deploy at misc42.github.io/sanketra/.
// Sanketra repo's web/ subfolder is the build root. basePath matches repo
// name (Misc42/sanketra → /sanketra/) so all internal links + asset URLs
// resolve correctly under the GitHub Pages sub-path.
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  poweredByHeader: false,
  output: 'export',
  basePath: '/sanketra',
  trailingSlash: true,
  images: { unoptimized: true },
};

module.exports = nextConfig;
