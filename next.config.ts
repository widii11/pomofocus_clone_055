/** next.config.js */
const repo = "https://github.com/widii11/Pomofocus_Clone_055.git"; // ganti dengan nama repo GitHub lo

module.exports = {
  output: "export", // gunakan next export
  trailingSlash: true, // membantu routing di GitHub Pages
  // jika mau host di subpath (username.github.io/REPO_NAME), set basePath & assetPrefix:
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
};
