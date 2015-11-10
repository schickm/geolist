Template.header.helpers({
    title() {
        const listRoutes = ['listDetail', 'shareList'];
        return (listRoutes.indexOf(Router.current().route.getName()) !== -1 &&
                this.list) ?
            this.list.name : 'GeoList';
    },
});
