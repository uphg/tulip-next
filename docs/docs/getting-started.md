# 快速开始

## 安装

使用 npm 安装

```sh
npm install tulip-ui
```

## 全局引入

```js
import { createApp } from 'vue'
import tulip from 'tulip-ui'

const app = createApp(App)
app.use(tulip)
```

## 按需引入

```js
import { createApp } from 'vue'
import { TuButton, TuInput, TuSpace } from 'tulip-ui'

const app = createApp(App)
app.use(TuButton)
app.use(TuInput)
app.use(TuSpace)
```