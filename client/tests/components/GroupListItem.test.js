import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import GroupListItem
from '../../Component/DashBoard/SideBarComponent/GroupListItem.jsx';

function setUp() {
  const props = {
    handleChangeGroup: () => {},
    groups: [],
    activeGroup: null
  };
  return mount(<GroupListItem {...props} />);
}

describe('Components', () => {
  describe('GroupListItem', () => {
    it('Should render self', () => {
      const wrapper = setUp();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('ul').exists()).toBe(true);
      expect(wrapper.find('li').exists()).toBe(true);
    });
    it('should simulate a click event', () => {
      const wrapper = setUp();
      wrapper.find('a').simulate('click');
      expect(wrapper.props.handleChangeGroup.mock.calls.length).toBe(1);
    });
  });
});
