Router.configure({
    layoutTemplate: 'layout',
});

Router.route('/', {
    name: 'allLists',
    data() {
        return {lists: Lists.find()};
    },
});

Router.route('/lists/create', {name: 'createList'});

Router.route('/lists/:_id', {
    name: 'listDetail',
    data() {
        return {
            list: Lists.findOne(this.params._id),
        };
    },
    subscriptions() {
        return [
            Meteor.subscribe('userItems', this.params._id),
            Meteor.subscribe('userItemTypes', this.params._id),
        ];
    },
});

Router.route('/lists/:_id/share', {
    name: 'shareList',
    subscriptions() {
        return Meteor.subscribe('users');
    },
    onBeforeAction() {
        if ( Lists.findOne({_id: this.params._id, userId: Meteor.userId()}) ) {
            this.next();
        } else {
            this.redirect('allLists');
        }
    },
    data() {
        return {
            users: Meteor.users.find({
                _id: {$ne: Meteor.userId()},
            }),
            list: Lists.findOne(this.params._id),
        };
    },
});
