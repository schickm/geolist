Template.userDetail.helpers({
    email: function() {
        return this.emails[0].address;
    },
    sharedOnList: function() {
        var listId = Router.current().params._id,
            list = Lists.findOne(listId);

        if (list.sharedUsers && list.sharedUsers.indexOf(this._id) > -1) {
            return true;
        } else {
            return false;
        }
    }
});


Template.userDetail.events({
    'change input': function(event) {
        // toggle the status
        var listId = Router.current().params._id,
            isChecked = event.target.checked,
            query;

        if ( isChecked ) {
            query = { 
                $addToSet: {
                    sharedUsers: this._id
                }
            };
        } else {
            query = {
                $pull: {
                    sharedUsers: this._id
                }
            };
        }

        Lists.update(listId, query);
    }
});