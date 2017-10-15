import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import SignInForm from '../../Component/AuthComponent/SignIn.jsx';

function setUp() {
  const props = {
    responseGoogle: () => {},
    handleOnSubmit: () => {},
    handleInputChange: () => {},
    showSignup: false,
    email: '',
    password: '',
  };
  return shallow(<SignInForm {...props} />);
}

describe('Components', () => {
  describe('SignIn Component', () => {
    it('Should render a form with input fields', () => {
      const wrapper = setUp();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('form').exists()).toBe(true);
      expect(wrapper.find('input').length).toBe(2);
      expect(wrapper.find('#email').exists()).toBe(true);
      expect(wrapper.find('#password').exists()).toBe(true);
    });
    it('should contain a h4 tag with a text', () => {
      const wrapper = setUp();
      expect(wrapper.find('h4').text()).toEqual('Sign In');
    });
    it('should contain a google login component', () => {
      const wrapper = setUp();
      expect(wrapper.find('#google-login').exists()).toEqual(true);
    });
    it('should get button with type submit', () => {
      const wrapper = setUp();
      expect(wrapper.find('button').type()).toEqual('button');
    });
  });
});
