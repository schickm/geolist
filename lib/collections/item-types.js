ItemTypes = new Mongo.Collection('item-types');

function userCanEdit (userId, doc) {
	return Helpers.userCanEditList(userId, doc.listId);
}

ItemTypes.allow({
    insert: userCanEdit,
    update: userCanEdit,
    remove: userCanEdit
});

