import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { Notes } from './notes';

if(Meteor.isServer) {
  describe('notes', function() {
    const noteOne = {
      _id: 'testNoteId1',
      title: 'Title',
      body: 'Content',
      updatedAt: 0,
      userId: 'testUserId1'
    };

    beforeEach(function() {
      Notes.remove({});
      Notes.insert(noteOne);
    });

    it('should insert a new note', function() {
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });
      expect(Notes.findOne({ _id, userId })).toExist();
    });

    it('should not insert a new note when user not logged in', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it('should remove a note', function() {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);
      expect(Notes.findOne({ _id: noteOne._id })).toNotExist();
    });

    it('should not remove a note when user not logged in', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not remove a note if note id is invalid', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId });
      }).toThrow();
    });

    it('should update note', function() {
      const title = 'This is a new title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      }, [noteOne._id, { title }]);

      const note = Notes.findOne(noteOne._id);

      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toInclude({
        title,
        body: noteOne.body
      });
    });

    it('should throw an error if extra updates', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: noteOne.userId
        }, [noteOne._id, { title: 'new title', name: 'Sophie' }]);
      }).toThrow();
    });

    it('should not update the note if user was not the creator', function() {
      const title = 'This is a new title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'randomuser'
      }, [noteOne._id, { title }]);

      const note = Notes.findOne(noteOne._id);

      expect(note).toInclude(noteOne);
    });

    it('should not update a note when user not logged in', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not update a note if note id is invalid', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId });
      }).toThrow();
    });

  });
}
