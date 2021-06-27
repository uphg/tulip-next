<template>
  <div id="app">
    <div class="sidebar">
      <ul class="sidebar-ul">
        <li
          v-for="(item, index) in siderbars"
          :key="index"
          class="sidebar-item"
          :class="{ active: index === viewIndex }"
          @click="setViewIndex(index)"
        >{{ item }}</li>
      </ul>
    </div>
    <div class="page">
      <div class="container">
        <component :is="componentId" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from './view/Button.vue'
import Input from './view/Input.vue'
import CaptchaCountdown from './view/CaptchaCountdown.vue'
import Icon from './view/Icon.vue'
import Transitions from './view/Transition.vue'
const VIEW_INDEX = 'view-index'
export default {
  name: 'App',
  components: {
    Button,
    Input,
    CaptchaCountdown,
    Icon,
    Transitions
  },
  data() {
    return {
      viewIndex: 0,
      siderbars: [
        'Button',
        'Input',
        'CaptchaCountdown',
        'Icon',
        'Transitions'
      ]
    }
  },
  computed: {
    componentId() {
      return this.siderbars[this.viewIndex]
    }
  },
  mounted() {
    const index = window.localStorage.getItem(VIEW_INDEX)
    index && this.setViewIndex(index)
  },
  methods: {
    setViewIndex(index) {
      this.viewIndex = Number(index)
      window.localStorage.setItem(VIEW_INDEX, index)
    }
  }
}
</script>

<style lang="stylus">

.tulp-collapse-transition {
  transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
}

button, input, select, textarea {
  font-family: inherit;
}
body {
  margin 0
}
#app {
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  display flex
  box-sizing border-box
}
.sidebar {
  width 320px
  height 100vh
  box-sizing border-box
  border-right 1px solid #eee;
  padding 20px
}
.sidebar-ul {
  list-style none
  margin 0
  padding 0
}
.sidebar-item {
  cursor pointer
  border 1px solid #eee
  margin 0
  padding 16px 12px
  margin-bottom 10px
  transition all 0.3s
  &.active, &:hover {
    color #1a73e8
    border-color #1a73e8
  }
}
.page {
  height 100vh
  overflow-y auto
  box-sizing border-box
  flex-grow 1
  padding 20px
}
.container {
  max-width 910px
  margin 0 auto
}

/* === 自定义布局 === */
h2 {
  // text-align: center;
}

.row {
  margin-top: 20px;
  margin-bottom: 20px;
  &:not(.button-group) {
    button {
      margin-right: 15px;
    }
  }
}
.icon-list > [class^="t-icon-"] {
  margin-right: 20px;
}
.label {
  text-align: right;
  width: 120px;
  display: inline-block;
  padding-right: 10px;
}
.show-password-demo {
  & > input {
    line-height: 34px;
    padding: 0 14px;
  }
}
.demo-input {
  .t-input {
    width: 180px;
  }
}
.demo-input-addon {
  .t-input {
    width: 360px;
  }
}
.demo-icon-svg {
  color: blue;
  svg {
    width: 1em;
    height: 1em;
  }
}
</style>
