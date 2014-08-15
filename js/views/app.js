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

	events: {
		'keypress #new-todo': 'createOnEnter',
		'click #clear-completed': 'clearCompleted',
		'click #toggle-all': 'toggleAllComplete'
	},

	// bind the relevant items to the Todos collection, when items are add or changed
	initialize: function() {
		// store important parts of HTML in local cache
		this.allCheckbox = this.$('#toggle-all')[0];
		this.$input = this.$('#new-todo');
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');

		this.listenTo(app.Todos, 'add', this.addOne);
		this.listenTo(app.Todos, 'reset', this.addAll);
		this.listenTo(app.Todos, 'change:completed', this.filterOne);
		this.listenTo(app.Todos, 'filter', this.filterAll);
		this.listenTo(app.Todos, 'all', this.render);

		app.Todos.fetch();
	},

	// rerendering the app just means updating the statistics. Nothing else changes.
	render: function() {
		var completed = app.Todos.completed().length,
			remaining = app.Todos.remaining().length;

		if (app.Todos.length) {
			this.$main.show();
			this.$footer.show();

			this.$footer.html(this.statsTemplate({
				completed: completed,
				remaining: remaining
			}));

			this.$('#filters li a')
				.removeClass('selected')
				.filter('[href="#/' + (app.TodoFilter || '') + '"]')
				.addClass('selected');
		} else {
			this.$main.hide();
			this.$footer.hide();
		}

		this.allCheckbox.checked = !remaining;
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
	},

	filterOne: function(todo) {
		todo.trigger('visible');
	},

	filterAll: function() {
		app.Todos.each(this.filterOne, this);
	},

	// generate the attributes for a new todo item
	newAttributes: function() {
		return {
			title: this.$input.val().trim(),
			order: app.Todos.nextOrder(),
			completed: false
		};
	},

	// if you hit the return in the main input field, create new Todo model
	createOnEnter: function(event) {
		// check if the event being passed is in fact the key press
		if (event.which !== ENTER_KEY || !this.$input.val().trim()) {
			return;
		}
		// creates new instance of Todo
		app.Todos.create(this.newAttributes());
		this.$input.val('');
	},

	// clear all completed todo items, destroying their models
	clearCompleted: function() {
		_.invoke(app.Todos.completed(), 'destroy');
		return false;
	},

	toggleAllComplete: function() {
		var completed = this.allCheckbox.checked;
		app.Todos.each(function(todo) {
			todo.save({
				'completed': completed
			});
		});
	}

});