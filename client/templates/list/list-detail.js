
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

Template.listDetail.events({
    'submit form': function(event) {
        event.preventDefault();
        var itemEl = event.target.item;

        // make a list item
        Items.insert({
            userId: Meteor.userId(),
            listId: this.list._id,
            item: itemEl.value,
            done: false
        });

        itemEl.value = '';
    }
})