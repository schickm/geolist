
Template.listDetail.helpers({
    itemsSorted: function() {        
        return Items.find({
                listId: Router.current().params._id
        }, {
            sort: {
                done: 1
            }
        });
    },

    canShareList: function() {
    	if (Lists.findOne({_id: Router.current().params._id, userId: Meteor.userId()})) {
    		return true;
    	} else {
    		return false;
    	}
    }
});