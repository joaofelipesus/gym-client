import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import LoginForm from '@/components/LoginForm.vue'
import { mount } from '@vue/test-utils'

describe('LoginForm fields', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(LoginForm)
  })
  it('email', () => {
    expect(wrapper.find('#email').exists()).to.be.true
  })
  it('password', () => {
    expect(wrapper.find("#password").exists()).to.be.true
  })
})

describe('Error message', () => {
  it('should render error message only when error attribute has a value', async () => {
    const wrapper = mount(LoginForm)
    expect(wrapper.text()).to.not.match(/Some error/)
    wrapper.setData({errors: 'Some error'})
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).to.match(/Some error/)    
  })
})
