<script lang="tsx">
import { defineComponent, h } from 'vue'
import { TuButton } from '../../src'

export default defineComponent({
  name: 'TestButton',
  setup() {

    const bases = ['default', 'primary', 'success', 'info', 'warning', 'error']

    return () => (
      <div class="button-demo">
        <h2>默认样式</h2>
        <div class="flex gap-3">
          {[
            bases.map((item) => h(TuButton, { hue: item }, { default:() => item })),
          ]}
        </div>
        <h2>默认样式（禁用）</h2>
        <div class="flex gap-3">
          {[
            bases.map((item) => h(TuButton, { hue: item, disabled: true }, { default:() => item })),
          ]}
        </div>
        <h2>透明按钮</h2>
        <div class="flex gap-3">
          {[
            bases.map((item) => h(TuButton, { hue: item, ghost: true }, { default:() => item })),
          ]}
        </div>
        <h2>透明按钮（禁用）</h2>
        <div class="flex gap-3">
          {[
            bases.map((item) => h(TuButton, { hue: item, ghost: true, disabled: true }, { default:() => item })),
          ]}
        </div>

        <h2>圆角按钮</h2>
        <div class="flex gap-3">
          {[
            bases.map((item) => h(TuButton, { hue: item, round: true }, { default:() => item })),
          ]}
        </div>
        <h2>圆角按钮（禁用）</h2>
        <div class="flex gap-3">
          {[
            bases.map((item) => h(TuButton, { hue: item, round: true, disabled: true }, { default:() => item })),
          ]}
        </div>
      </div>
    )
  }
})
</script>

<style lang="stylus">
.button-demo {
  padding: 180px 60px
  .tu-button {
    min-width: 80px;
  }
}
</style>