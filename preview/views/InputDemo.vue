<template>
  <tu-space vertical>
    <tu-input/>
    <tu-input clearable/>
    <tu-input loading/>
    <tu-input clearable loading/>
    <tu-input type="password" />
    <tu-input type="password" visibility-toggle="click"/>
    <tu-input type="password" visibility-toggle="mousedown"/>
    <tu-input type="password" visibility-toggle="click" clearable loading/>
    <tu-input type="password" visibility-toggle="click" clearable loading>
      <template #suffix>#</template>
    </tu-input>
    <tu-input type="password" visibility-toggle="mousedown" clearable loading/>
  </tu-space>
</template>