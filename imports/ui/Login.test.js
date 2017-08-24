import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Login } from './Login';

if(Meteor.isClient) {
  describe('Login', function() {
    it('should show an error message', function() {
      const error = 'There is an error';
      const wrapper = mount(<Login loginWithPassword={() => {}} />);

      wrapper.setState({ error });
      expect(wrapper.find('p').text()).toBe(error);
    });

    it('should call loginWithPassword with form data', function() {
      const email = 'test@test.com';
      const password = 'password';
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy}/>);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;

      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email });
      expect(spy.calls[0].arguments[1]).toEqual(password);
    });

    it('should set loginWithPassword callback errors', function() {
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy}/>);

      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[2]({});
      expect(wrapper.state('error')).toNotBe('');

      spy.calls[0].arguments[2]();
      expect(wrapper.state('error').length).toBe(0);
    });
  });
}
