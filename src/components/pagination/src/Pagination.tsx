import { computed, defineComponent, type PropType } from 'vue'
import Icon from '../../icon/src/Icon'
import { ArrowLeftRound, ArrowRightRound, ArrowFastRewind, ArrowFastForward, Ellipsis } from '../../../icons'

const paginationProps = {
  current: {
    type: Number as PropType<number>,
    default: 1
  },
  pageSize: {
    type: Number as PropType<number>,
    default: 10
  },
  total: Number as PropType<number>,
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
    const totalPages = computed(() => Math.ceil((props.total ?? 0) / props.pageSize))
    const pagings = computed(() => getPagings(props.current, { totalPages: totalPages.value }))

    function handleCurrent(item: PagingItem) {
      emit('update:current', item.value)
    }

    function handlePrev() {
      const prev = props.current - 1
      if (prev >= 1) {
        emit('update:current', prev >= 1 ? prev : 1)
      }
    }

    function handleNext() {
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

function getPagings(current: number, { totalPages }: { totalPages: number }) {
  const result = [{ value: 1, type: 0 }]
  const start = current <= 5
    ? 2
    : current >= (totalPages - 4)
      ? totalPages - 7
      : current - 3
  let count = start
  let index = -1
  while (++index <= 6) {
    if ((current - 5) >= 1 && index === 0) {
      result.push({ value: count, type: -1 })
    } else if ((current + 5) <= totalPages && index === 6) {
      result.push({ value: count, type: 1 })
    } else {
      result.push({ value: count, type: 0 })
    }
    count += 1
  }
  result.push({ value: totalPages, type: 0 })
  return result
}

export default Pagination