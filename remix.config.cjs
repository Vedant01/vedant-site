/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: "netlify",
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "cjs",
  tailwind: false,
  postcss: true,
  watchPaths: ['./tailwind.config.ts'],
  serverDependenciesToBundle: ["three", "postprocessing"],
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildPath: "build/server/index.js",
  devServerPort: 8002,
  future: {
    unstable_cssModules: true,
    unstable_cssSideEffectImports: true,
    unstable_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
    v3_fetcherPersist: true,
    v3_lazyRouteDiscovery: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true
  },
  // Headers for font files
  headers: {
    '**/*.woff2': {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Access-Control-Allow-Origin': '*'
    }
  }
};