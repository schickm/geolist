Items = new Mongo.Collection('items');

Items.allow({
    insert: Helpers.belongsToUser,
    update: Helpers.belongsToUser,
    remove: Helpers.belongsToUser
});

