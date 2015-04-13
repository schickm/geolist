'use strict';

Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/', {
    name: 'allLists',
    data: function() {
        return {lists: Lists.find({})};
    }
});

Router.route('/lists/create', {name: 'createList'});

Router.route('/lists/:_id', {
    name: 'listDetail',
    data: function() {
        return Lists.findOne(this.params._id);
    }
});

Router.route('/add', {name: 'add'});