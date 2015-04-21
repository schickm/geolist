
Template.listDetail.helpers({
    itemsSorted: function() {        
        return Items.find({
                listId: Router.current().params._id,
                done: false
        }, {
            sort: ['item']
        });
    }
});