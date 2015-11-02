
Template.itemDetail.events({
    'change input': function() {
        // toggle the status
        var isDone = ! this.done,
        	coords = Geolocation.currentLocation().coords;

        Items.update(this._id, {$set: {
            done: isDone
        }});

        if ( isDone ) {
        	ItemTypes.update(this.itemTypeId,
        		{$set: { lat: coords.latitude, lng: coords.longitude}}
        	);
        }
    }
});