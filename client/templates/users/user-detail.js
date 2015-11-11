function currentListId () {
    return Router.current().params._id;
}

Template.userDetail.helpers({
    email() {
        return this.emails[0].address;
    },
    sharedOnList() {
        let listId = currentListId(),
            list = Lists.findOne(listId);

        if (list.sharedUsers && list.sharedUsers.indexOf(this._id) > -1) {
            return true;
        }

        return false;
    },
});


// write handler for removing users from a list

Template.userDetail.events({
    'click button': function changeInputHandler() {
        Meteor.call('removeListFromUser', currentListId(), this._id);
    },
});
