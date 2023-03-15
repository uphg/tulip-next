<template>
  <tu-space vertical>
    <tu-layout>
      <tu-header>Header</tu-header>
      <tu-content>Content</tu-content>
      <tu-footer>Footer</tu-footer>
    </tu-layout>
    <tu-layout direction="row">
      <tu-sidebar>Sidebar</tu-sidebar>
      <tu-layout grow="1">
        <tu-header>Header</tu-header>
        <tu-content>Content</tu-content>
        <tu-footer>Footer</tu-footer>
      </tu-layout>
    </tu-layout>
  </tu-space>
</template>

<style scoped>
.tu-layout-header,
.tu-layout-footer {
  padding: 24px;
  background: #b3c0d1;
}

.tu-layout-sidebar {
  padding: 24px;
  background: #d3dce6;
}

.tu-layout-content {
  padding: 24px;
  background: #e9eef3;
}
</style>