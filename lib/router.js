'use strict';

Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/', {
    name: 'allLists',
    data: function() {
        return {lists: Lists.find()};
    }
});

Router.route('/lists/create', {name: 'createList'});

Router.route('/lists/:_id', {
    name: 'listDetail',
    data: function() {
        return {
            list: Lists.findOne(this.params._id)
        };
    },
    subscriptions: function() {
        return Meteor.subscribe('userItems', this.params._id);
    },
});

Router.route('/lists/:_id/add', {
    name: 'addItem',
    data: function() {
        return {
            list: Lists.findOne(this.params._id),
            items: Items.find({userId: Meteor.userId()})
        };
    }
});

Router.route('/lists/:_id/share', {
    name: 'shareList',
    subscriptions: function() {
        return Meteor.subscribe('users');
    },
    data: function () {
        return {
            users: Meteor.users.find({
                _id: {$ne: Meteor.userId()}
            })
        };
    }
});