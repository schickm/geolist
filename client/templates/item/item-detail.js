
Template.itemDetail.events({
    'change input': function() {
        // toggle the status
        Items.update(this._id, {$set: {
            done: ! this.done
        }});
    }
});