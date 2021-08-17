<template>
  <main class="page">
    <div class="page-wrapper">
      <slot />
    </div>
  </main>
</template>
<style lang="scss" scoped>
.page {
  padding-left: 320px;
  transition: padding .2s ease;
}
.page-wrapper {
  box-sizing: border-box;
  padding: 24px;
}

@media (max-width: 719px) {
 .page {
    padding-left: 0;
  }
}
</style>