// Write your package code here!

Helpers = {
    belongsToUser: function(userId, doc) {
        return !!userId && userId === doc.userId;
    },
    userCanEditList: function(userId, listId) {
    	var list = Lists.findOne({
    	    $and: [
    	        {_id: listId},
    	        {$or: [
    	            {userId: userId},
    	            {sharedUsers: {$in: [userId]}
    	        }
    	    ]
    	}]});

    	if (list) {
    		return true;
    	} else {
    		return false;
    	}
    }
};