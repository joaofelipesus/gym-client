import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import ErrorMessage from '@/components/shared/ErrorMessage'

describe('Error message', () => {
  it('doesnt render message when error is empty', () => {
    const wrapper = mount(ErrorMessage, {
      propsData: {
        errors: ''
      }
    })
    expect(wrapper.text()).to.not.match(/Some error/)
  })

  it('renders when errors has a value', async () => {
    const wrapper = mount(ErrorMessage, {
      propsData: {
        errors: 'Some error'
      }
    })
    expect(wrapper.text()).to.match(/Some error/)
  })
})
