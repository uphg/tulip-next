import { mount } from '@vue/test-utils'
import { TButton } from '../index'

describe('Button', () => {
  it('create', () => {
    const wrapper = mount(TButton)
    expect(wrapper.exists()).toBe(true)
  })

  it('clickable', async () => {
    const onClick = jest.fn()
    const wrapper = mount(TButton, {
      props: { onClick }
    })
    await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('type', () => {
    const wrapper = mount(TButton, {
      props: { type: 'primary' }
    })
    expect(wrapper.classes()).toContain('tu-button--primary')
  })

  it('size', () => {
    const wrapper = mount(TButton, {
      props: { size: 'large' }
    })
    expect(wrapper.classes()).toContain('tu-button--large')
  })

  it('icon', () => {
    const wrapper = mount(TButton, {
      props: { icon: 'close' }
    })
    expect(wrapper.find('.tu-icon-close').exists()).toBeTruthy()
  })

  it('nativeType', () => {
    const wrapper = mount(TButton, {
      props: { nativeType: 'submit' }
    })
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('loading', () => {
    const wrapper = mount(TButton, {
      props: { loading: true }
    })
    expect(wrapper.find('.tu-button__loading-icon').exists()).toBeTruthy()
  })

  it('disabled', async () => {
    const wrapper = mount(TButton, {
      props: { disabled: true }
    })
    /* 测试 disabled 样式，暂时省略 */
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
})

