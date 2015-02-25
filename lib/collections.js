'use strict';

geolist.collections.Items = new Mongo.Collection('items');

var belongsToUser = function(userId, doc) {
	return !!userId && userId === doc.userId;
};

geolist.collections.Items.allow({
	insert: belongsToUser,
	update: belongsToUser,
	remove: belongsToUser
});

geolist.collections.ListItems = new Mongo.Collection('listItems');

geolist.collections.ListItems.allow({
	insert: belongsToUser,
	update: belongsToUser,
	remove: belongsToUser
});