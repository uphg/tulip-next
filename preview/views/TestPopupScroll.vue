<template>
  <div class="popup-scroll-demo">
    <h2>模拟滚动</h2>
    <p v-for="item in 40" :key="item">{{ item }}</p>
    <p style="width: 200em;">我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，我很长，</p>
    <div style="margin-left: 50em; width: 2000px; display: flex;">
      <tu-popup class="popup-demo" placement="top-start" v-model:visible="visible3" trigger="manual">
        <template #trigger>
          <tu-button @click="(visible3 = !visible3)">Top Start</tu-button>
        </template>
        而我能够遇见你 怎能不是我幸运
      </tu-popup>
      <tu-popup class="popup-demo" v-model:visible="visible2" trigger="manual">
        <template #trigger>
          <tu-button @click="(visible2 = !visible2)">Top</tu-button>
        </template>
        <div>而我能够遇见你 怎能不是我幸运。怎能不是我幸运 怎能不是我幸运</div>
      </tu-popup>
      <tu-popup class="popup-demo" placement="top-end" v-model:visible="visible" trigger="manual">
        <template #trigger>
          <tu-button @click="(visible = !visible)">Top End</tu-button>
        </template>
        而我能够遇见你 怎能不是我幸运
      </tu-popup>

      <tu-popup class="popup-demo" placement="bottom-start" v-model:visible="visible4" trigger="manual">
        <template #trigger>
          <tu-button @click="(visible4 = !visible4)">Bottom Start</tu-button>
        </template>
        而我能够遇见你 怎能不是我幸运
      </tu-popup>
      <tu-popup class="popup-demo" placement="bottom" v-model:visible="visible5" trigger="manual">
        <template #trigger>
          <tu-button @click="(visible5 = !visible5)">Bottom</tu-button>
        </template>
        而我能够遇见你 怎能不是我幸运
      </tu-popup>
      <tu-popup class="popup-demo" placement="bottom-end" v-model:visible="visible6" trigger="manual">
        <template #trigger>
          <tu-button @click="(visible6 = !visible6)">Bottom End</tu-button>
        </template>
        而我能够遇见你 怎能不是我幸运
      </tu-popup>

      <tu-popup class="popup-demo" placement="left-start" v-model:visible="visible7" trigger="manual">
        <template #trigger>
          <tu-button @click="(visible7 = !visible7)">Left Start</tu-button>
        </template>
        <div>如果世间真的有天使</div>
        <div>毫无疑问 那一定是你</div>
        <div>不然为何你会毫不犹豫</div>
        <div>走进无边黑暗里</div>
      </tu-popup>
      <tu-popup class="popup-demo" placement="left" v-model:visible="visible8" trigger="manual">
        <template #trigger>
          <tu-button @click="(visible8 = !visible8)">Left</tu-button>
        </template>
        <div>如果世间真的有天使</div>
        <div>毫无疑问 那一定是你</div>
        <div>不然为何你会毫不犹豫</div>
        <div>走进无边黑暗里</div>
      </tu-popup>
      <tu-popup class="popup-demo" placement="left-end" v-model:visible="visible9" trigger="manual">
        <template #trigger>
          <tu-button @click="(visible9 = !visible9)">Left End</tu-button>
        </template>
        <div>如果世间真的有天使</div>
        <div>毫无疑问 那一定是你</div>
        <div>不然为何你会毫不犹豫</div>
        <div>走进无边黑暗里</div>
      </tu-popup>

      <tu-popup class="popup-demo" placement="right-start" v-model:visible="visible10" trigger="manual">
        <template #trigger>
          <tu-button @click="(visible10 = !visible10)">Right Start</tu-button>
        </template>
        <div>如果世间真的有天使</div>
        <div>毫无疑问 那一定是你</div>
        <div>不然为何你会毫不犹豫</div>
        <div>走进无边黑暗里</div>
      </tu-popup>
      <tu-popup class="popup-demo" placement="right" v-model:visible="visible11" trigger="manual">
        <template #trigger>
          <tu-button @click="(visible11 = !visible11)">Right</tu-button>
        </template>
        <div>如果世间真的有天使</div>
        <div>毫无疑问 那一定是你</div>
        <div>不然为何你会毫不犹豫</div>
        <div>走进无边黑暗里</div>
      </tu-popup>
      <tu-popup class="popup-demo" placement="right-end" v-model:visible="visible12" trigger="manual">
        <template #trigger>
          <tu-button @click="(visible12 = !visible12)">Right End</tu-button>
        </template>
        <div>如果世间真的有天使</div>
        <div>毫无疑问 那一定是你</div>
        <div>不然为何你会毫不犹豫</div>
        <div>走进无边黑暗里</div>        
      </tu-popup>

      <tu-popup class="popup-demo" placement="right-end" trigger="click" popup-margin="20">
        <template #trigger>
          <tu-button>点我点我</tu-button>
        </template>
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
      </tu-popup>
    </div>
    <p v-for="item in 50" :key="item + 'a'">{{ item }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
.popup-scroll-demo {
  .tu-button {
    min-width: 100px;
  }
}

.popup-demo {
  padding 8px 12px
  background-color #fff
  box-shadow var(--tu-box-shadow)
}
</style>