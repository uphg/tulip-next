<template>
  <div class="tulp-col">
    <slot />
  </div>
</template>
<style lang="stylus">
cols = ( 1) (two 2) (three 3)
for num in (1..10)
  .col-{num}
    width 100%
</style>
