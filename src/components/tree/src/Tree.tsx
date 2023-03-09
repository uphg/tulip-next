import { defineComponent, ref, type PropType } from 'vue'
import { treeProps } from './props'
import TuTreeNode from './TreeNode'

const Tree = defineComponent({
  name: 'TuTree',
  props: treeProps,
  setup(props) {
    return () => (
      <div>
        {props.data?.map((item) => (
          <TuTreeNode item={item} key={item.key} level={0}/>
        ))}
      </div>
    )
  }
})

export default Tree
