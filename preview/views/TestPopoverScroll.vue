<template>
  <div class="popover-scroll-demo">
    <h2>模拟滚动</h2>
    <p v-for="item in 40" :key="item">{{ item }}</p>
    <p style="width: 200em;">我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，</p>
    <div style="padding-left: 90em; display: flex; flex-direction: column; gap: 16px;">
      <tu-popover placement="top-start" v-model:visible="visible3" trigger="manual">
        <template #content>而我能够遇见你 怎能不是我幸运</template>
        <tu-button @click="(visible3 = !visible3)">Top Start</tu-button>
      </tu-popover>
      <tu-popover v-model:visible="visible2" trigger="manual">
        <template #content>而我能够遇见你 怎能不是我幸运</template>
        <tu-button @click="(visible2 = !visible2)">Top</tu-button>
      </tu-popover>
      <tu-popover placement="top-end" v-model:visible="visible" trigger="manual">
        <template #content>而我能够遇见你 怎能不是我幸运</template>
        <tu-button @click="(visible = !visible)">Top End</tu-button>
      </tu-popover>

      <tu-popover placement="bottom-start" v-model:visible="visible4" trigger="manual">
        <template #content>而我能够遇见你 怎能不是我幸运</template>
        <tu-button @click="(visible4 = !visible4)">Bottom Start</tu-button>
      </tu-popover>
      <tu-popover placement="bottom" v-model:visible="visible5" trigger="manual">
        <template #content>而我能够遇见你 怎能不是我幸运</template>
        <tu-button @click="(visible5 = !visible5)">Bottom</tu-button>
      </tu-popover>
      <tu-popover placement="bottom-end" v-model:visible="visible6" trigger="manual">
        <template #content>而我能够遇见你 怎能不是我幸运</template>
        <tu-button @click="(visible6 = !visible6)">Bottom End</tu-button>
      </tu-popover>

      <tu-popover placement="left-start" v-model:visible="visible7" trigger="manual">
        <template #content>
          <div>如果世间真的有天使</div>
          <div>毫无疑问 那一定是你</div>
          <div>不然为何你会毫不犹豫</div>
          <div>走进无边黑暗里</div>
        </template>
        <tu-button @click="(visible7 = !visible7)">Left Start</tu-button>
      </tu-popover>
      <tu-popover placement="left" v-model:visible="visible8" trigger="manual">
        <template #content>
          <div>如果世间真的有天使</div>
          <div>毫无疑问 那一定是你</div>
          <div>不然为何你会毫不犹豫</div>
          <div>走进无边黑暗里</div>
        </template>
        <tu-button @click="(visible8 = !visible8)">Left</tu-button>
      </tu-popover>
      <tu-popover placement="left-end" v-model:visible="visible9" trigger="manual">
        <template #content>
          <div>如果世间真的有天使</div>
          <div>毫无疑问 那一定是你</div>
          <div>不然为何你会毫不犹豫</div>
          <div>走进无边黑暗里</div>
        </template>
        <tu-button @click="(visible9 = !visible9)">Left End</tu-button>
      </tu-popover>

      <tu-popover placement="right-start" v-model:visible="visible10" trigger="manual">
        <template #content>
          <div>如果世间真的有天使</div>
          <div>毫无疑问 那一定是你</div>
          <div>不然为何你会毫不犹豫</div>
          <div>走进无边黑暗里</div>
        </template>
        <tu-button @click="(visible10 = !visible10)">Right Start</tu-button>
      </tu-popover>
      <tu-popover placement="right" v-model:visible="visible11" trigger="manual">
        <template #content>
          <div>如果世间真的有天使</div>
          <div>毫无疑问 那一定是你</div>
          <div>不然为何你会毫不犹豫</div>
          <div>走进无边黑暗里</div>
        </template>
        <tu-button @click="(visible11 = !visible11)">Right</tu-button>
      </tu-popover>
      <tu-popover placement="right-end" v-model:visible="visible12" trigger="manual">
        <template #content>
          <div>如果世间真的有天使</div>
          <div>毫无疑问 那一定是你</div>
          <div>不然为何你会毫不犹豫</div>
          <div>走进无边黑暗里</div>
        </template>
        <tu-button @click="(visible12 = !visible12)">Right End</tu-button>
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

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const visible4 = ref(false)
const visible5 = ref(false)
const visible6 = ref(false)
const visible7 = ref(false)
const visible8 = ref(false)
const visible9 = ref(false)
const visible10 = ref(false)
const visible11 = ref(false)
const visible12 = ref(false)

</script>

<style lang="stylus">
.popover-scroll-demo {
  .tu-button {
    min-width: 100px;
  }
}
</style>