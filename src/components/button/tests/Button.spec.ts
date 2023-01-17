import { mount } from '@vue/test-utils'
import { TuButton } from '../index'

describe('Button', () => {
  it('create', () => {
    const wrapper = mount(TuButton)
    expect(wrapper.exists()).toBe(true)
  })

  it('clickable', async () => {
    const onClick = jest.fn()
    const wrapper = mount(TuButton, {
      props: { onClick }
    })
    await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('type', () => {
    const wrapper = mount(TuButton, {
      props: { hue: 'primary' }
    })
    expect(wrapper.classes()).toContain('tu-button--primary')
  })

  it('size', () => {
    const wrapper = mount(TuButton, {
      props: { size: 'large' }
    })
    expect(wrapper.classes()).toContain('tu-button--large')
  })

  it('icon', () => {
    const wrapper = mount(TuButton, {
      props: { icon: 'close' }
    })
    expect(wrapper.find('.tu-icon-close').exists()).toBeTruthy()
  })

  it('native type', () => {
    const wrapper = mount(TuButton, {
      props: { type: 'submit' }
    })
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('loading', () => {
    const wrapper = mount(TuButton, {
      props: { loading: true }
    })
    expect(wrapper.find('.tu-button__loading-icon').exists()).toBeTruthy()
  })

  it('disabled', async () => {
    const wrapper = mount(TuButton, {
      props: { disabled: true }
    })
    /* 测试 disabled 样式，暂时省略 */
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
})

