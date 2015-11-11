Template.userDetail.helpers({
    email() {
        return this.emails[0].address;
    },
    sharedOnList() {
        let listId = Router.current().params._id,
            list = Lists.findOne(listId);

        if (list.sharedUsers && list.sharedUsers.indexOf(this._id) > -1) {
            return true;
        }

        return false;
    },
});


Template.userDetail.events({
    'change input': function changeInputHandler(event) {
        // toggle the status
        let listId = Router.current().params._id,
            isChecked = event.target.checked,
            query;

        if ( isChecked ) {
            query = {
                $addToSet: {
                    sharedUsers: this._id,
                },
            };
        } else {
            query = {
                $pull: {
                    sharedUsers: this._id,
                },
            };
        }

        Lists.update(listId, query);
    },
});
