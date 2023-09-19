#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
npm run build

# cd 到构建输出的目录下
cd dist

# place .nojekyll to bypass Jekyll processing
touch .nojekyll

# 部署到自定义域域名
# echo 'www.example.com' > CNAME
git init

git add .

git commit -m 'deploy'

git config http.proxy "127.0.0.1:10809"

git config https.proxy "127.0.0.1:10809"

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
git push -f https://github.com/zheyi420/cesium-demo.git master:gh-pages

cd -