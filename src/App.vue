<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <h2 class="title-h2">
      hi
    </h2>
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="clickButton">点我打招呼</button>
    <hr>
    <Button>hi, jack</Button>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Button from '@/components/Button.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Button
  },
  methods: {
    clickButton() {
      alert('hi')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
