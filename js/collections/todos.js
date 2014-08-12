// todos.js

var app = app || {};

// Todos collection backed by backbone.localStorage that overwrites the default backbone.sync() RESTful API calls

var TodoList = Backbone.Collection.extend({

	model: app.Todo,

	localStorage: new Backbone.LocalStorage('todos-backbone'),

	// Filter the list of all todo items to get ones that are already completed
	// Returns an array
	completed: function() {
		return this.filter(function(todo) {
			return todo.get('completed');
		});
	},

	// Filter the list of all todo items to get ones that are still remaining
	// Returns an array
	remaining: function() {
		return this.without.apply(this, this.completed());
	},

	// We will keep the items in the list ordered even though they are saved randomly in the database.
	// This function generates the next order number for new items (sequence generator)
	nextOrder: function() {
		if (!this.length) {
			return 1;
		}
		// find last element and get it's order number, and then add 1
		return this.last().get('order') + 1;
	},

	// Sorts Todos by their insertion order.
	comparator: function(todo) {
		return todo.get('order');
	}

});

// Instantiate our global collection of Todos
app.Todos = new TodoList();