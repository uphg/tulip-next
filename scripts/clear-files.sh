# 确保脚本抛出遇到的错误
set -e

cd dist
rm -rf font style/common favicon.ico
mv style.css main.css


