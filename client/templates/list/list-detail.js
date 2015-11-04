// boring
function toRad(num) {
    return num * (Math.PI / 180);
}

function calcDistance(lat1, lon1, lat2, lon2) {
    let R = 6371, // km
        dLat = toRad(lat2 - lat1),
        dLon = toRad(lon2 - lon1),
        dLat1 = toRad(lat1),
        dLat2 = toRad(lat2),
        a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) *
            Math.cos(dLat1) * Math.cos(dLat2),
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

Template.listDetail.helpers({
    itemsSorted() {
        let position = Geolocation.currentLocation(),
            query = {listId: Router.current().params._id};

        if (! Session.get('showCompletedItems')) {
            query.done = false;
        }
        let itemList = Items.find(query).fetch();

        if (position) {
            itemList = _.sortBy(itemList, item => {
                if (item.lat && item.lng) {
                    return calcDistance(position.coords.latitude,
                                        position.coords.longitude,
                                        item.lat, item.lng);
                }
            });
        }

        return _.sortBy(itemList, 'done');
    },

    showCompletedItems() {
        return Session.get('showCompletedItems');
    },

    canShareList() {
        if (Lists.findOne({
            _id: Router.current().params._id,
            userId: Meteor.userId(),
        })) {
            return true;
        }

        return false;
    },

    currentPositionString() {
        let position = Geolocation.currentLocation();
        if (position) {
            return `${position.coords.latitude}N ${position.coords.longitude}E`;
        }
    },
});

Template.listDetail.events({
    'submit form': function submitFormHandler(event) {
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
                done: false,
            };

        Meteor.call('addListItem', listItemDoc, () => {
            // blank out the input
            input.value = '';
        });
    },

    'click .completed-toggle': function clickCompletedToggleHandler() {
        Session.set('showCompletedItems', ! Session.get('showCompletedItems'));
    },
});
