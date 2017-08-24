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
  });
}
