Template.createList.events({
    'submit form': function(event) {
        event.preventDefault();
        var nameEl = event.target.name;

        var listId = Lists.insert({
            userId: Meteor.userId(),
            name: nameEl.value
        });

        nameEl.value = '';

        Router.go('listDetail', {_id: listId});

    }
});