# GeoList
A list making app that sorts your todo's by proximity to you.  

You can find the most recent deployed version at http://geolist.meteor.com

Ever been in the grocery store and wished your list would reorder based on what's closest to you?  This one does.  After an item is checked off from your list, the application remembers the location you checked it off.  Next time you add it to the list, it'll come up on top when you get close.



Made to accompany a lecture in App Design at Columbia College.

## Points of interest

* [Normalizing data with ObjectID references when adding items to a list](client/templates/item/add-item.js)
* [Linking users to lists via ObjectID references](client/templates/users/user-detail.js)
* [Reusable helper for determining if someone can edit a list](packages/helpers/helpers.js)
  * Usage of helper in  [publications.js](server/publications.js) and [items.js](lib/collections/items.js)
* [Same restriction as a template helper](client/templates/list/list-detail.js)
* [Restriction of routes based on mongo query](lib/router.js)
* [Prevention of UI display with {{#if currentUser}}](client/templates/layout.html)



