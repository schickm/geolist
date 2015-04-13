ListItems = new Mongo.Collection('listItems');

ListItems.allow({
    insert: Helpers.belongsToUser,
    update: Helpers.belongsToUser,
    remove: Helpers.belongsToUser
});

