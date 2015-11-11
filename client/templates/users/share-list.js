
Template.shareList.events({
    'submit form': function handleSubmit(event) {
        event.preventDefault();
        Meteor.call('shareListWithUser',
            this.list._id,
            event.target.email.value,
            true,
            (err) => {
                if (err) {
                    console.log(err);
                }
            }
        );
    },
});