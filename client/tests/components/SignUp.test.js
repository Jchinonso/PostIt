import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import SignUpForm from '../../Component/AuthComponent/SignUp.jsx';

function setUp() {
  const props = {
    handleOnSubmit: () => {},
    handleInputChange: () => {},
    showSignin: false,
    email: '',
    password: '',
    phoneNumber: '',
    username: ''
  };
  return shallow(<SignUpForm {...props} />);
}

describe('Components', () => {
  describe('SignUp Component', () => {
    it('Should render a form with input fields', () => {
      const wrapper = setUp();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('form').exists()).toBe(true);
      expect(wrapper.find('input').length).toBe(4);
      expect(wrapper.find('#email').exists()).toBe(true);
      expect(wrapper.find('#password').exists()).toBe(true);
      expect(wrapper.find('#name').exists()).toBe(true);
      expect(wrapper.find('#icon_telephone').exists()).toBe(true);
    });
    it('should contain a h4 tag with a text', () => {
      const wrapper = setUp();
      expect(wrapper.find('h4').text()).toEqual('Sign Up');
    });
    it('should get button with type submit', () => {
      const wrapper = setUp();
      expect(wrapper.find('button').type()).toEqual('button');
    });
  });
});
