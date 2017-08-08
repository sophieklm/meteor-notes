import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { Notes } from './notes';

if(Meteor.isServer) {
  describe('notes', function() {

    beforeEach(function() {
      Notes.remove({});
      Notes.insert({
        _id: 'testNoteId1',
        title: 'Title',
        body: 'Content',
        updatedAt: 0,
        userId: 'testUserId1'
      });
    });

    it('should insert a new note', function() {
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });
      expect(Notes.findOne({ _id, userId })).toExist();
    });

    it('should note insert a new note when user not logged in', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it('should remove a note', function() {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: 'testUserId1' }, ['testNoteId1']);
      expect(Notes.findOne({ _id: 'testNoteId1' })).toNotExist();
    });

  });
}
