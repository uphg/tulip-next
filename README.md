# Tulip

[![Build Status](https://travis-ci.com/uphg/tulip.svg?branch=master)](https://travis-ci.com/uphg/tulip)

一个 Vue 组件库，包括：

- ESLint 检查
- Karma + Mocha 单元测试

## 命令

安装依赖

```sh
yarn install
```

运行

```sh
yarn start
```

打包

```sh
yarn build
```

运行测试

```sh
yarn test
```

ESLint 代码检查

```sh
yarn lint
# 检查并自动修复
yarn lint --fix
```

## 日志

组件库最终完成后将 `package.json` 中的 `sideEffects` 属性配置为 `"sideEffects": false`。