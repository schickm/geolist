
Template.shareList.events({
    'submit form': function handleSubmit(event) {
        event.preventDefault();
        let input = event.target.email;
        Meteor.call('shareListWithUser',
            this.list._id,
            input.value,
            (err) => {
                input.value = '';
            }
        );
    },
});