'use strict';

Template.add.events({
	'submit form': function(event) {
		event.preventDefault();
		var labelEl = event.target.label;
		
		geolist.collections.Items.update({
			userId: Meteor.userId(),
			label: labelEl.value
		}, {
			upsert: true
		});

		labelEl.value = '';
	}
});