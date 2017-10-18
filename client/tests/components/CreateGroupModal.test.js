import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import CreateGroupModal from '../../Component/Dashboard/SideBarComponent/CreateGroupModal.jsx';

function setUp() {
  const props = {
    handleOnClick: () => {},
    handleOnChange: () => {},
    name: '',
    description: '',
  };
  return mount(<CreateGroupModal {...props} />);
}

describe('Components', () => {
  describe('SignIn Component', () => {
    it('Should render self', () => {
      const wrapper = setUp();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('form').exists()).toBe(true);
      expect(wrapper.find('input').length).toBe(2);
      expect(wrapper.find('#group_name').exists()).toBe(true);
      expect(wrapper.find('#group_desc').exists()).toBe(true);
    });
    it('should contain a h4 tag with a text', () => {
      const wrapper = setUp();
      expect(wrapper.find('h4').text()).toEqual('Create a Group');
    });
    it('should simulate a click event', () => {
      const wrapper = setUp();
      wrapper.find('a').simulate('click');
      expect(wrapper.props.handleOnClick.mock.calls.length).toBe(1);
    });
  });
});
