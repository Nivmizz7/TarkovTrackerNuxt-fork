module.exports = {
  apps: [
    {
      name: "TarkovTracker-nuxt",
      cwd: __dirname,
      script: "/bin/bash",
      args: "-lc 'npm run dev'",
      autorestart: true,
    }
  ]
}
