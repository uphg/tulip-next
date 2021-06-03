<template>
  <div class="hello-wworld">
    <h1>{{ msg }}</h1>
    <p>使用 Vue + Webpack 搭建的项目</p>
    <h3>我是一只猫</h3>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: { msg: String }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
<style lang="scss">
h3 {
  margin: 40px 0 0;
  color: red;
}
</style>
