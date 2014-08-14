// app.js

var app = app || {};

// The application is here.
// The AppView is the top-level piece of UI.

app.AppView = Backbone.View.extend({

	// Instead of generating a new element, bind to the existing skeleton of the app
	// already present in the HTML

	// todoapp is the entire todo list in the HTML
	el: '#todoapp',

	statsTemplate: _.template($('#stats-template').html()),

	// bind the relevant items to the Todos collection, when items are add or changed
	initialize: function() {
		this.alLCheckbox = this.$('#toggle-all')[0];
		this.$input = this.$('#new-todo');
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');

		this.listenTo(app.Todos, 'add', this.addOne);
		this.listenTo(app.Todos, 'reset', this.addAll);
	},

	// Add a single todo item to the list by creating a view and appending it to the <ul>
	addOne: function(todo) {
		var view = new app.TodoView({ model: todo });
		$('#todo-list').append(view.render().el);
	},

	// Add all items in the Todos collection at once
	addAll: function() {
		this.$('#todo-list').html('');
		app.Todos.each(this.addOne, this);
	}

});