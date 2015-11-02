
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
        var input = event.target.item,
            itemLabel = input.value,
            listItemDoc = {
                userId: Meteor.userId(),
                listId: this.list._id,
                label: itemLabel,
                quantity: 1,
                lat: null,
                lng: null,
                done: false
            };

        Meteor.call('addListItem', listItemDoc, function() {
            // blank out the input
            input.value = '';
        });

        
    }
});