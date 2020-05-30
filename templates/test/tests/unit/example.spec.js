import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

test('switch', () => {
  const wrapper = mount(HelloWorld)
  expect(wrapper.isVueInstance()).toBeTruthy()
})
