import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import IndexPage from '../pages/index.vue'

describe('IndexPage', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(IndexPage)
    expect(wrapper.vm).toBeTruthy()
  })
})
