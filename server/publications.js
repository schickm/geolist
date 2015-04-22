Meteor.publish('userLists', function() {
    if (this.userId) {
        return Lists.find({$or: [
            {userId: this.userId},
            {sharedUsers: {$in: [this.userId]}}
        ]});    
    } else {
        return this.ready();
    }
    
});

Meteor.publish('userItems', function(listId) {
    if ( Helpers.userCanEditList(this.userId, listId) ) {
        return Items.find({
            listId: listId
        });    
    } else {
        return this.ready();
    }
    
});

Meteor.publish('users', function() {
    return Meteor.users.find({
        userId: {$ne: this.userId}
    }, {
        fields: {'emails.address': 1}
    });
});