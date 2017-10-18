import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import MessageBoardComponent
from '../../Component/DashBoard/MainComponent/MessageBoardComponent/Index.jsx';

function setUp() {
  const props = {
    messages: '',
    username: '',
  };
  return mount(<MessageBoardComponent {...props} />);
}

describe('Components', () => {
  describe('MessageBoardComponent', () => {
    it('Should render self', () => {
      const wrapper = setUp();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('.card').exists()).toBe(true);
      expect(wrapper.find('.div').length).toBe(6);
    });
  });
});
