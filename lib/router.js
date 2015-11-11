Router.configure({
    layoutTemplate: 'layout',
});

Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});

Router.route('/', {
    name: 'allLists',
    data() {
        return {lists: Lists.find()};
    },
});

Router.route('/lists/create', {name: 'createList'});

Router.route('/lists/:_id', {
    name: 'listDetail',
    waitOn() {
        return [
            Meteor.subscribe('userItems', this.params._id),
            Meteor.subscribe('userItemTypes', this.params._id),
        ];
    },
    data() {
        return Lists.findOne(this.params._id);
    },
});

Router.route('/lists/:_id/share', {
    name: 'shareList',
    waitOn() {
        return Meteor.subscribe('listSharedUsers', this.params._id);
    },
    data() {
        let list = Lists.findOne({
            _id: this.params._id,
            userId: Meteor.userId(),
        });

        if (list) {
            return {
                users: Meteor.users.find({
                    _id: {$ne: Meteor.userId()},
                }),
                list: list,
            };
        }

        return undefined;
    },
});
