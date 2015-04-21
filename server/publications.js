Meteor.publish('userLists', function() {
    return Lists.find({$or: [
        {userId: this.userId},
        {sharedUsers: {$in: [this.userId]}}
    ]});
});

Meteor.publish('userItems', function(listId) {
    // check and see if user is in that list or it is shared
    var list = Lists.findOne({
        $and: [
            {_id: listId},
            {$or: [
                {userId: this.userId},
                {sharedUsers: {$in: [this.userId]}
            }
        ]
    }]});

    if (list) {
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