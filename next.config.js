/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }

    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['vscode-oniguruma', '@wooorm/starry-night'],
    esmExternals: 'loose'
  },
};

export default config;
