import { computed, defineComponent, type PropType } from "vue"
import { map } from '../../../utils'

const paginationProps = {
  current: {
    type: Number as PropType<number>,
    default: 1
  },
  total: {
    type: Number as PropType<number>,
    default: 0
  },
  pageSize: {
    type: Number as PropType<number>,
    default: 10
  }
}

const Pagination = defineComponent({
  name: 'TuPagination',
  props: paginationProps,
  emits: ['update:current'],
  setup(props, context) {
    const { emit } = context
    const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

    const handleCurrent = (value: number) => {
      emit('update:current', value)
    }

    const handlePrev = () => {
      const prev = props.current - 1
      if (prev >= 1) {
        emit('update:current', props.current - 1)
      }
    }

    const handleNext = () => {
      const next = props.current + 1
      if (next <= totalPages.value) {
        emit('update:current', props.current + 1)
      }
    }
    return () => (
      <div class="tu-pagination">
        <button disabled={props.current <= 1} onClick={handlePrev}>上一页</button>
        {map<number, JSX.Element>(totalPages.value, (item, index) => (
          <button
            key={index}
            class={['tu-pagination-item', { active: item === props.current }]}
            onClick={() => handleCurrent(item)}
          >{item}</button>
        ))}
        <button disabled={props.current >= totalPages.value} onClick={handleNext}>下一页</button>
      </div>
    )
  }
})

export default Pagination