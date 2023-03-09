<template>
  <h2>Divider 分割线</h2>
  <div style="padding: 120px 0">
    内容
    <tu-divider />
    内容
  </div>
  <h2>Divider 虚线</h2>
  <div style="padding: 120px 0">
    内容
    <tu-divider color="red" dashed/>
    内容
  </div>
  <tu-divider title="我是标题" dashed></tu-divider>
  <h2>Divider 标题</h2>
  <div>
    内容
    <tu-divider title-placement="left">我是标题</tu-divider>
    <tu-divider title="我是标题"></tu-divider>
    <tu-divider title="我是标题" title-placement="right"></tu-divider>
    内容
  </div>
  <h2>Divider 垂直</h2>
  <div>
    内容<tu-divider vertical />内容
  </div>
</template>