import { computed, defineComponent, inject, onMounted, ref } from "vue";
import { TuIcon } from "../../icon";
import ArrowRightRoundSmall from "../../../icons/ArrowRightRoundSmall.vue";
import { TuCollapseTransition } from '../../collapse-transition'

const collapseItemProps = {
  title: [String, Number],
  name: [String, Number],
}

const CollapseItem = defineComponent({
  name: 'TuCollapseItem',
  props: collapseItemProps,
  setup(props, context) {
    const index = ref(0)
    const collapseList = inject('collapseList')
    const active = computed(() => collapseList.value[index.value]?.active)
    const setCollapse = inject('setCollapse')
    function onClickItem() {
      console.log('被点了')
      setCollapse(index.value, { active: !active.value })
    }
    
    
    onMounted(() => {
      const _index = collapseList.value.length
      setCollapse(_index, {
        name: props.name,
        active: false
      })
      index.value = _index
      console.log('props.name')
      console.log(props.name)

    })
    return () => (
      <div class="tu-collapse-item">
        <div class="tu-collapse-item__header" onClick={onClickItem}>
          <span class={['tu-collapse-item-arrow', { active: active.value }]}>
            <TuIcon><ArrowRightRoundSmall/></TuIcon>
          </span>
          {props.title}
        </div>
        <TuCollapseTransition>
          {active.value ? (
            <div class="tu-collapse-item__content-wrap">
              <div class="tu-collapse-item__content">{context.slots.default?.()}</div>
            </div>
          ) : null}
        </TuCollapseTransition>
      </div>
    )
  }
})

export default CollapseItem
