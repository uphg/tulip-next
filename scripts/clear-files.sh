set -e

cd dist
rm -rf font style/common favicon.ico
mv style.css main.css
cd -