'use strict';

Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/', {name: 'list'});
Router.route('/add', {name: 'add'});