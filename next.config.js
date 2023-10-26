/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  async rewrites() {
    return [
      {
        source: "/api-web/:path*",
        destination: process.env.BASE_URL,
      },
      {
        source: "/getActivity",
        destination:
          "https://todo.api.devcode.gethired.id/activity-groups?email=ianfebi01%40gmail.com",
      },
    ];
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });
    return config;
  },
	output: 'standalone',
};

module.exports = nextConfig;
