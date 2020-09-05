import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { NavLink } from 'react-router-dom'

import NavItems from './NavItems'
configure({adapter: new Adapter()})

describe('<NavItems />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<NavItems />)
  })

  it('should render two <NavLink /> elements if not authenticated', () => {
    expect(wrapper.find(NavLink)).toHaveLength(2)
  })

  it('should render three <NavLink /> elements if authenticated', () => {
    wrapper.setProps({isAuth: true})
    expect(wrapper.find(NavLink)).toHaveLength(3)
  })
})

