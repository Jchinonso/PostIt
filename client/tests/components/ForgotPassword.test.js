import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import { ForgotPassword } from '../../Component/AuthComponent/ForgotPassword.jsx';

const setup = () => {
  const props = {
    forgotPassword: () => Promise.resolve(),
  };
  return mount(<ForgotPassword {...props} />);
};
describe('ForgotPassword', () => {
  describe('Given ForgotPassword component is mounted', () => {
    it('should render self and subcomponents', () => {
      const wrapper = setup();
      expect(wrapper.exists()).toBe(true);
    });
    it('should set state when email input changes', () => {
      const wrapper = setup();
      wrapper.find('#email').simulate('change', {
        target: {
          name: 'email',
          value: 'new@email.com'
        }
      });
      expect(wrapper.state('email')).toEqual('new@email.com');
    });
    it('should call sendPasswordResetMail on submit and show preloader',
    () => {
      const wrapper = setup();
      const SubmitButton = wrapper.find('#mybtn');
      SubmitButton.simulate('click');
      expect(SubmitButton.props.forgotPassword.mock.calls.length).toBe(1);
    });
  });
});
