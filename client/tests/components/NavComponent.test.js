import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import NavComponent from '../../Component/DashBoard/NavComponent/Index.jsx';

function setUp() {
  const props = {
    signOut: () => {},
  };
  return mount(<NavComponent {...props} />);
}
describe('Components', () => {
  describe('NavBar component', () => {
    it('Should render self', () => {
      const wrapper = setUp();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('nav.top-nav').exists()).toBe(true);
      expect(wrapper.find('div').length).toBe(3);
    });
    it('should call logOut when log out is clicked', () => {
      const wrapper = setUp();
      wrapper.find('.sign-out').simulate('click');
      expect(wrapper.props.signOut.mock.calls.length).toBe(1);
    });
  });
});
