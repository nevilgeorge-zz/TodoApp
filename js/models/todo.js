// todo.js

var app = app || {};

// Todo model. Wrapping it in a namespace so we don't clutter the global scope.

app.Todo = Backbone.Model.extend({

	// Default attributes ensure that each todo crated has 'title' and 'completed' keys
	defaults: {
		title: '',
		completed: false
	},

	// Function to toggle whether or not a todo item is completed or not
	// Updates and saves in one function
	toggle: function() {
		this.save({
			completed: !this.get('completed')
		});
	}

});