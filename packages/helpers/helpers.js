// Write your package code here!

Helpers = {
    belongsToUser: function(userId, doc) {
        return !!userId && userId === doc.userId;
    }
};