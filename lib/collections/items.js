Items = new Mongo.Collection('items');

function userCanEdit (userId, doc) {
	return Helpers.userCanEditList(userId, doc.listId);
}

Items.allow({
    insert: userCanEdit,
    update: userCanEdit,
    remove: userCanEdit
});

