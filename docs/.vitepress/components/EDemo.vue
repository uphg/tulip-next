<template>
  <div class="e-demo">
    <div class="component">
      <component :is="componentIs" />
    </div>
    <TuCollapseTransition>
      <div class="e-code-wrap tu-dark" v-show="visible">
        <tu-scrollbar class="e-code-scrollbar">
          <div class="e-code-source language-vue" v-html="decodeURIComponent(html)"></div>
        </tu-scrollbar>
        <button ref="copyEl" :class="['e-button-copy', { copied }]" @click="copy"></button>
        <span v-if="lang" class="lang">{{ lang }}</span>
      </div>
    </TuCollapseTransition>
    <div class="control" @click="visible = !visible">{{ `${visible ? '收起' : '展开'}源码` }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TuCollapseTransition } from '../../../src/index'
import { copyToClipboard } from '../utils';

const props = defineProps({
  source: {
    type: String,
    default: ''
  },
  html: {
    type: String,
    default: ''
  },
  componentName: String,
  part: [Object],
  lang: String
})

const visible = ref(false)
const copyEl = ref<HTMLButtonElement | null>(null)
const copied = ref(false)
const timeoutId = ref(null)
const componentIs = { ...props.part, name: props.componentName }

function copy() {
  const code = decodeURIComponent(props.source)
  copyToClipboard(code).then(() => {
    copied.value = true
    timeoutId.value && clearTimeout(timeoutId.value)
    timeoutId.value = setTimeout(() => {
      copied.value = false
      copyEl.value.blur()
    }, 2000)
  })
}
</script>

<style lang="stylus" scoped>
.e-demo {
  width: 100%;
  border-radius: 6px;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
  box-shadow: 0 3px 12px rgba(0, 0, 0, .07), 0 1px 4px rgba(0, 0, 0, .07);
  overflow: hidden;
  position: relative;
}
.component {
  padding: 22px 24px;
}
.e-demo .e-code-source {
  border-top: 1px solid var(--vp-c-divider-light);
  color: #fff;
  overflow-x: auto;
  margin: 0;
  border-radius: 0;
}

:deep(.e-code-source pre) {
  margin: 0;
  border-radius: 0;
}
.control {
  border-top: 1px solid var(--vp-c-divider-light);
  font-size: 14px;
  cursor: pointer;
  height: 42px;
  line-height: 42px;
  text-align: center;
  user-select:none;
}

.e-code-wrap {
  position: relative;
  &:hover .e-button-copy {
    opacity: 1;
  }

  &:hover > .e-button-copy + .lang,
  & > .e-button-copy:focus + .lang {
    opacity: 0;
  }
}

.e-code-scrollbar {
  max-height: 800px;
}

.e-button-copy {
  direction: ltr;
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 3;
  display: block;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 40px;
  height: 40px;
  background-color: transparent;
  opacity: 0;
  cursor: pointer;
  background-image: var(--vp-icon-copy);
  background-position: 50%;
  background-size: 20px;
  background-repeat: no-repeat;
  transition: background-color, opacity .4s;
  &:hover {
    background-color: var(--vp-code-copy-code-hover-bg);
  }
  &.copied {
    border-radius: 0 4px 4px 0;
    background-color: var(--vp-code-copy-code-hover-bg);
    background-image: var(--vp-icon-copied);
  }
  &:focus {
    opacity: 1;
  }
}
.e-button-copy.copied::before,
.e-button-copy:hover.copied::before {
  position: relative;
  /*rtl:ignore*/
  left: -65px;
  display: flex;
  justify-content: center;
  align-items: center;
  /*rtl:ignore*/
  border-radius: 4px 0 0 4px;
  width: 64px;
  height: 40px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-code-copy-code-active-text);
  background-color: var(--vp-code-copy-code-hover-bg);
  white-space: nowrap;
  content: 'Copied';
}
.lang {
  position: absolute;
  top: 6px;
  right: 12px;
  z-index: 2;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-dark-3);
  transition: color .4s,opacity .4s;
}
</style>

<style>
.e-code-wrap .tu-scrollbar-track {
  z-index: 1;
}
</style>
