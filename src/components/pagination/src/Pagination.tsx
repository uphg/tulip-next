import { computed, defineComponent, type PropType } from 'vue'
import Icon from '../../icon/src/Icon'
import ArrowLeftRound from '../../../icons/ArrowLeftRound.vue'
import ArrowRightRound from '../../../icons/ArrowRightRound.vue'
import ArrowFastRewind from '../../../icons/ArrowFastRewind.vue'
import ArrowFastForward from '../../../icons/ArrowFastForward.vue'
import Ellipsis from '../../../icons/Ellipsis.vue'

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

type PagingItem = {
  value: number, type: number
}

const Pagination = defineComponent({
  name: 'TuPagination',
  props: paginationProps,
  emits: ['update:current'],
  setup(props, context) {
    const { emit } = context
    const totalPages = computed(() => Math.ceil(props.total / props.pageSize))
    const pagings = computed(() => {
      const { current } = props
      const result = [{ value: 1, type: 0 }]
      const start = current <= 5
        ? 2
        : current >= (totalPages.value - 4)
          ? totalPages.value - 7
          : current - 3
      let count = start
      let index = -1
      while (++index <= 6) {
        if ((current - 5) >= 1 && index === 0) {
          result.push({ value: count, type: -1 })
        } else if ((current + 5) <= totalPages.value && index === 6) {
          result.push({ value: count, type: 1 })
        } else {
          result.push({ value: count, type: 0 })
        }
        count += 1
      }
      result.push({ value: totalPages.value, type: 0 })
      return result
    })

    const handleCurrent = (item: PagingItem) => {
      emit('update:current', item.value)
    }

    const handlePrev = () => {
      const prev = props.current - 1
      if (prev >= 1) {
        emit('update:current', prev >= 1 ? prev : 1)
      }
    }

    const handleNext = () => {
      const next = props.current + 1
      if (next <= totalPages.value) {
        emit('update:current', next <= totalPages.value ? next : totalPages.value)
      }
    }
    return () => (
      <div class="tu-pagination">
        <button class="tu-pagination-button tu-pagination-prev" disabled={props.current <= 1} onClick={handlePrev}>
          <Icon is={ArrowLeftRound}/>
        </button>
        {pagings.value.map((item, index) => item.type === 0
          ? (<button
              key={index}
              class={['tu-pagination-button tu-pagination-item', { active: item.value === props.current }]}
              onClick={() => handleCurrent(item)}
            >{item.value}</button>)
          : item.type === -1 || item.type === 1
            ? (<button
                class="tu-pagination-button tu-pagination-button-ellipsis"
                onClick={() => handleCurrent({ value: props.current + item.type * 3, type: 0 })}>
                <Icon is={item.type === -1 ? ArrowFastRewind : ArrowFastForward}/>
                <Icon is={Ellipsis}/>
              </button>)
            : null)}
        <button class="tu-pagination-button tu-pagination-next" disabled={props.current >= totalPages.value} onClick={handleNext}>
          <Icon is={ArrowRightRound}/>
        </button>
      </div>
    )
  }
})

export default Pagination