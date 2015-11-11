NonEmptyString = Match.Where(x => {
    check(x, String);
    return x.length > 0;
});

Meteor.methods({
    addListItem(listItemDoc) {
        check(listItemDoc.label, NonEmptyString);

        // check to see if the matching itemType already exists
        let query = {listId: listItemDoc.listId, label: listItemDoc.label},
            existingType = ItemTypes.findOne(query);

        if ( ! existingType ) {
            let coords = {lat: null, lng: null},
                newTypeId = ItemTypes.insert(Object.assign(query, coords));
            Object.assign(listItemDoc,
                coords,
                {itemTypeId: newTypeId}
            );
        } else {
            Object.assign(listItemDoc, {
                lat: existingType.lat,
                lng: existingType.lng,
                itemTypeId: existingType._id,
            });
        }

        // make a list item
        return Items.insert(listItemDoc);
    },

    shareListWithUser(listId, email, share) {
        check(listId, String);
        check(email, String);

        let user = Meteor.users.findOne(
            {'emails.address': email},
            {fields: {'_id': 1}}
        );
        check(user, Object);

        let query = share ?
            {$addToSet: {sharedUsers: user._id}} :
            {$pull: {sharedUsers: user._id}};

        Lists.update(listId, query);
    },
});
