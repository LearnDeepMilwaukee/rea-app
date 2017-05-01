import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Component from '.'

const wrapper = shallow(<Component>content</Component>)

test('should render', async t => {
  t.is(wrapper.length, 1)
})
