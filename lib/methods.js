Meteor.methods({
	addListItem: function(listItemDoc) {
		// check to see if the matching itemType already exists
		var query = {listId: listItemDoc.listId, label: listItemDoc.label},
        	existingType = ItemTypes.findOne(query); 
        
        if ( ! existingType ) {
        	var coords = {lat: null, lng: null};
            var newTypeId = ItemTypes.insert(Object.assign(query, coords));
            Object.assign(listItemDoc, 
            	coords, 
            	{itemTypeId: newTypeId}
            );
        } else {
        	Object.assign(listItemDoc, {
	    		lat: existingType.lat,
	        	lng: existingType.lng,
	        	itemTypeId: existingType._id
	    	}); 	
        }

        // make a list item
        return Items.insert(listItemDoc);
	}
});