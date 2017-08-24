import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import PrivateHeader from './PrivateHeader';

if(Meteor.isClient) {
  describe('PrivateHeader', function() {
    it('should set button text to logout', function() {
      const wrapper = mount( <PrivateHeader title="test title"/> );

      const buttonText = wrapper.find('.button').text();

      expect(buttonText).toBe('Logout');
    });
    it('should use title prop as h1 text', function() {
      const title = 'Test title';
      const wrapper = mount(<PrivateHeader title={title}/>);
      const actualTitle = wrapper.find('h1').text();

      expect(actualTitle).toBe(title);
    });
  });
}
