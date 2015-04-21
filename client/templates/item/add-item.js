'use strict';

Template.addItem.events({
	'submit form': function(event) {
		event.preventDefault();
		var itemEl = event.target.item;

		// make a list item
		Items.insert({
			userId: Meteor.userId(),
			listId: this.list._id,
			item: itemEl.value,
			done: false
		});

		itemEl.value = '';

		Router.go('listDetail', this.list);
	}
});