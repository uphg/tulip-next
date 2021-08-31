set -e

cd dist
rm -rf font style/common style/wave-effect.css favicon.ico
mv style.css main.css
cd -