import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import MessageInput from '../../Component/DashBoard/MessageArea/MessageInputBox.jsx';

function setUp() {
  const props = {
    content: '',
    handleInputChange: () => {},
    handleSubmitMessage: () => {},
  };
  return mount(<MessageInput {...props} />);
}

describe('Components', () => {
  describe('MessageInput Component', () => {
    it('Should render self', () => {
      const wrapper = setUp();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('input').length).toBe(1);
      expect(wrapper.find('.input-box_text').exists()).toBe(true);
      expect(wrapper.find('.input-box').exists()).toBe(true);
      expect(wrapper.find('.input-field').exists()).toBe(true);
    });
    it('should simulate a keypress event', () => {
      const wrapper = setUp();
      wrapper.find('.input-box_text').simulate('keypress');
      expect(wrapper.props.handleSubmitMessage.mock.calls.length).toBe(1);
    });
  });
});
