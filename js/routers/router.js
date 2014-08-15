// js/routers/router.js

// Todo Router.
/* We will have 3 routes:
	#/ (all/ default)
	#/active
	$/completed
*/

var Workspace = Backbone.Router.extend({

	routes: {
		'*filter': 'setFilter'
	},

	setFilter: function(param) {
		// Set the filter to be used
		// Trigger a collection filter event, causing hiding/unhiding of Todo view items
		window.app.Todos.trigger('filter');
	}
});

app.TodoRouter = new Workspace();
Backbone.history.start();