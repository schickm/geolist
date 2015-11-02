Meteor.subscribe('userLists');

// kick off a request for the GPS right away
Geolocation.currentLocation();