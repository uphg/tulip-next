<template>
  <div>
    <h2>模拟滚动</h2>
    <p v-for="item in 40" :key="item">{{ item }}</p>
    <p style="width: 200em;">我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，</p>
    <div style="padding-left: 90em;">
      <tu-popover trigger="click">
        <template #content>而我能够遇见你 怎能不是我幸运</template>
        <tu-button>过渡动画</tu-button>
      </tu-popover>
      <tu-popover placement="left-end" trigger="click">
        <template #content>
          <div>如果世间真的有天使</div>
          <div>毫无疑问 那一定是你</div>
          <div>不然为何你会毫不犹豫</div>
          <div>走进无边黑暗里</div>
          <div>抱一抱你</div>
          <div>逆行的勇气</div>
          <div>如果世间真的有神灵</div>
          <div>请挥一挥手还宁静往昔</div>
          <div>然而只有你目光温暖我心灵</div>
          <div>双手扶我沉痛身躯</div>
          <div>抱一抱你</div>
          <div>不惧死亡的决心</div>
        </template>
        <tu-button>过渡动画</tu-button>
      </tu-popover>
    </div>
    <p v-for="item in 50" :key="item + 'a'">{{ item }}</p>
  </div>
</template>
<style>
.xxx {
  position: absloute
}
</style>