Template.header.helpers({
    title() {
        return (Router.current().route.getName() === 'listDetail' && this.list)  ?
            this.list.name : 'GeoList';
    },
});
