import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { Notes } from './notes';

if(Meteor.isServer) {
  describe('notes', function() {
    it('should work when user logged in', function() {
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });
      expect(Notes.findOne({ _id, userId })).toExist();
    });
    it('should fail when user not logged in', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });
  });
}
