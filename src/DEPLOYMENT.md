## How to deploy

1. Merge branch to master
2. ssh into droplet
  > ssh esnrRahman@138.197.157.47
3. Pull latest master
  > git pull origin master
4. Run the following commands
  > yarn run build
  > yarn install
  > pm2 restart all
