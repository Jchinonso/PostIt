import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { ResetPassword } from
'../../Component/AuthComponent/ResetPassword.jsx';

const setup = () => {
  const props = {
    resetPassword: () => Promise.resolve(),
  };
  return mount(<ResetPassword {...props} />);
};

describe('components', () => {
  describe('Given ResetPassword component is mounted', () => {
    const wrapper = setup();
    it('should render self and subcomponents', () => {
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('.auth-container-board')
      .exists()).toBe(true);
      expect(wrapper.find('.header-home').exists()).toBe(true);
      expect(wrapper.find('.auth-form').exists()).toBe(true);
      expect(wrapper.find('.input-field').exists()).toBe(true);
      expect(wrapper.find('#password').exists()).toBe(true);
      expect(wrapper.find('#verifyPassword').exists()).toBe(true);
    });

    it('should have state with key showPreloader', () => {
      expect(wrapper.state('')).toBe(false);
    });

    it('should set state when password input changes', () => {
      wrapper.find('#password').simulate('change', {
        target: {
          name: 'newPassword',
          value: '123456'
        }
      });
      wrapper.find('#verifyPassword').simulate('change', {
        target: {
          name: 'retypePassword',
          value: '123456'
        }
      });
      expect(wrapper.state('password')).toEqual('123456');
      expect(wrapper.state('verifyPassword')).toEqual('123456');
    });

    it('should call resetPassword on submit and show preloader',
    () => {
      const SubmitButton = wrapper.find('a.btn');
      SubmitButton.simulate('click');
      expect(SubmitButton.props.resetPassword.mock.calls.length).toBe(1);
    });
  });
});
