Meteor.publish('userLists', function userLists() {
    if (this.userId) {
        return Lists.find({$or: [
            {userId: this.userId},
            {sharedUsers: {$in: [this.userId]}},
        ]});
    }

    return this.ready();
});

Meteor.publish('userItems', function userItems(listId) {
    if ( Helpers.userCanEditList(this.userId, listId) ) {
        return Items.find({
            listId: listId,
        });
    }
    return this.ready();
});

Meteor.publish('userItemTypes', function userItemTypes(listId) {
    if ( Helpers.userCanEditList(this.userId, listId) ) {
        return ItemTypes.find({
            listId: listId,
        });
    }
    return this.ready();
});


Meteor.publish('listSharedUsers', function listSharedUsers(listId) {
    this.related(list => {
        if (list && list.sharedUsers) {
            return Meteor.users.find({
                '_id': {$in: list.sharedUsers},
            }, {
                fields: {'emails.address': 1},
            });
        }
        this.ready();
    }, Lists.find(listId, {fields: {'sharedUsers': 1}}));
});
