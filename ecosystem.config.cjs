module.exports = {
  apps: [
    {
      name: "tarkovtracker-nuxt",
      cwd: __dirname,
      script: "/bin/bash",
      args: "-lc 'npm run dev'",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production"
      }
    }
  ]
}
