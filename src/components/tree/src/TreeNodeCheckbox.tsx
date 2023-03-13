import { defineComponent, ref } from 'vue'
import TuCheckbox from '../../checkbox/src/Checkbox'
import { treeNodeCheckboxProps } from './props'

const TreeNodeCheckbox = defineComponent({
  name: 'TuTreeNodeCheckbox',
  props: treeNodeCheckboxProps,
  setup(props) {
    function handleClick(e: MouseEvent) {
      e.preventDefault()
      e.stopPropagation()
    }

    return () => (
      <div class="tu-tree-node-checkbox">
        <TuCheckbox
          checked={props.checked}
          indeterminate={props.indeterminate}
          onUpdate:checked={props.onUpdateChecked}
          onClick={handleClick}/>
      </div>
    )
  }
})

export default TreeNodeCheckbox