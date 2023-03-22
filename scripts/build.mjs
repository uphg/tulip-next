import path from 'path'
import { execa } from 'execa'
import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import minimist from 'minimist'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distDir = path.resolve(__dirname, '../dist')
const argv = minimist(process.argv.slice(2));

// use pnpm build -v 1.0.0-alpha.x
run(argv)

async function run(argv) {
  const { v: version = '1.0.0-alpha.1' } = argv

  // vite build
  await execa('run-p', ['type-check', 'build-only']).pipeStdout(process.stdout)
  console.log('\nstylus v0.59.0')
  await execa('stylus', ['./src/styles', '--out', 'dist/styles']).pipeStdout(process.stdout)

  const packageObj = {
    name: 'tulip-ui',
    version: version,
    license: 'MIT',
    main: 'index.umd.js',
    module: 'index.es.js',
    types: 'index.d.ts',
    description: 'A Vue 3 Component Library',
    keywords: ['vue', 'vue3', 'component'],
    homepage: 'https://github.com/uphg/tulip#readme',
    repository: 'uphg/tulip',
    bugs: 'uphg/tulip/issues',
    author: 'Lv Heng <lvheng233@gmail.com>'
  }

  const stringPackage = JSON.stringify(packageObj, null, 2)
  fs.writeFile(path.resolve(distDir, './package.json'), stringPackage)
  await execa('cp', ['README.md', 'dist'])
  console.log(`\ntulip v${version} build successful!`)
}
