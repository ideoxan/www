/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
    serverBuildTarget: "cloudflare-pages",
    server: "./server.js",
    ignoredRouteFiles: ["**/.*"],
    appDirectory: "app",
    devServerBroadcastDelay: 1000,
    // assetsBuildDirectory: "public/build",
    // serverBuildPath: "api/index.js",
    // publicPath: "/build/",
    mdx: async () => {
        const [rehypePrism, remarkReadingTime, readingMdxTime] = await Promise.all([
            import("@mapbox/rehype-prism").then(mod => mod.default),
            import("remark-reading-time").then(mod => mod.default),
            import("remark-reading-time/mdx.js").then(mod => mod.default),
        ])

        return {
            rehypePlugins: [rehypePrism],
            remarkPlugins: [remarkReadingTime, readingMdxTime],
        }
    },
}
