import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { TDialog, useDialog } from '../index'

describe('Dialog', () => {
  it('create', () => {
    const wrapper = mount(TDialog)
    expect(wrapper.exists()).toBe(true)
  })

  it('can be quickly called by type', () => {
    const wrapper = mount(defineComponent({
      setup() {
        const dialog = useDialog()
        dialog.success({
          title: 'Call success',
          content: 'Content'
        })
      },
      render() {
        return null
      }
    }))
    wrapper.unmount()
  })
})
