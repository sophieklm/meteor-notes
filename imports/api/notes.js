import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Notes = new Mongo.Collection('notes');

Meteor.methods({
  'notes.insert'() {
    if(!this.userId) {
      throw new Meteor.Error('not-authorised');
    }
    return Notes.insert({
      title: '',
      body: '',
      userId: this.userId,
      updatedAt: moment().valueOf()
    });
  },
  'notes.remove'(_id) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorised');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({_id});

    Notes.remove({
      _id,
      userId: this.userId
    });
  },
  'notes.update'(_id, updates) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorised');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      title: {
        type: String,
        optional: true
      },
      body: {
        type: String,
        optional: true
      }
    }).validate({
      _id,
      ...updates
    });

    Notes.update(_id, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    });
  }
});
