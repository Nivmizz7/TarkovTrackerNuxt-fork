module.exports = {
  apps: [
    {
      name: "TarkovTrackerNuxt-fork",
      cwd: __dirname,
      script: "/bin/bash",
      args: "-lc 'npm run dev'",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 3156,
        NUXT_PORT: 3156
      }
    }
  ]
}
