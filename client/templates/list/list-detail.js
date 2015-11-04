Number.prototype.toRad = function () {
    return this * (Math.PI / 180);
};

function calcDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = (lat2-lat1).toRad();
    var dLon = (lon2-lon1).toRad();
    lat1 = lat1.toRad();
    lat2 = lat2.toRad();

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    
    return R * c;
}

Template.listDetail.helpers({
    itemsSorted: function() {        
        var itemList = Items.find({
                listId: Router.current().params._id
            }).fetch(),
            position = Geolocation.currentLocation();

        if (position) {
            itemList = _.sortBy(itemList, function(item) {
                if (item.lat && item.lng) {
                    return calcDistance(position.coords.latitude, position.coords.longitude, item.lat, item.lng);
                }
            });
        }
        
        return _.sortBy(itemList, 'done');
    },

    canShareList: function() {
    	if (Lists.findOne({_id: Router.current().params._id, userId: Meteor.userId()})) {
    		return true;
    	} else {
    		return false;
    	}
    },

    currentPositionString: function() {
        var coords = Geolocation.currentLocation().coords;
        return `${coords.latitude}N ${coords.longitude}E`;
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