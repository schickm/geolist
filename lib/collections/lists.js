Lists = new Mongo.Collection('lists');

Lists.allow({
    insert: Helpers.belongsToUser,
    update: Helpers.belongsToUser,
    remove: Helpers.belongsToUser
});

Lists.helpers({
    items: function() {
        return Items.find({listId: this._id});
    }
});
