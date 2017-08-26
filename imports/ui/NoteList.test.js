import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteList } from './NoteList';

const notes = [
  {
    _id: 'note1',
    title: 'Test',
    body: '',
    updatedAt: 0,
    userId: 'user1'
  }, {
    _id: 'note2',
    title: 'Test',
    body: '',
    updatedAt: 0,
    userId: 'user2'
  }
];

if(Meteor.isClient) {
  describe('NoteList', function() {
    it('should render a NoteListItem for each note', function() {
      const wrapper = mount(<NoteList notes={notes}/>);

      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });

    it('should render a NoteListEmptyItem when no notes', function() {
      const wrapper = mount(<NoteList notes={[]}/>);

      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
    });
  });
}
