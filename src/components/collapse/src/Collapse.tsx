import { defineComponent, provide, ref, toRef, watch, type ExtractPropTypes, type PropType, type Ref } from 'vue'
import type { CollapseItemName } from './types'
import { isNil, remove } from '../../../utils'

export type CollapseProps = ExtractPropTypes<typeof collapseProps>

export const collapseInjectionKey = 'tu.collapse'

const collapseProps = {
  activeNames: [String, Number, Array, null] as PropType<string | number | Array<string | number> | null>,
  accordion: Boolean as PropType<boolean>
}

const Collapse = defineComponent({
  name: 'TuCollapse',
  props: collapseProps,
  emits: ['update:activeNames'],
  setup(props: CollapseProps, context) {
    const rawActiveNames = ref<CollapseProps['activeNames']>(props.accordion ? null : [])

    watch(toRef(props, 'activeNames'), (newValue) => {
      rawActiveNames.value = newValue
    })

    function triggerCollapseItem(name?: CollapseItemName) {
      if (isNil(name)) return

      if (props.accordion) {
        rawActiveNames.value = rawActiveNames.value === name ? null : name
      } else {
        const activeNames = (rawActiveNames.value as CollapseItemName[])
        const index = activeNames.indexOf(name)

        if (index > -1) {
          setActiveNames(remove(activeNames, (_, i) => i === index))
        } else {
          setActiveNames([...activeNames, name])
        }
      }
    }

    function setActiveNames(newValue: CollapseProps['activeNames']) {
      if (isNil(props.activeNames)) {
        rawActiveNames.value = newValue
      }

      context.emit('update:activeNames', props.accordion ? newValue : [...newValue as Array<string | number>])
    }

    provide(collapseInjectionKey, {
      activeNames: rawActiveNames,
      triggerCollapseItem,
      props
    })

    return () => (
      <div class="tu-collapse">
        {context.slots.default?.()}
      </div>
    )
  }
})

export default Collapse
