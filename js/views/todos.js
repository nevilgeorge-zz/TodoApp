// js/views/todos.js

var app = app || {};

// Todo Item View
// This controls the individual todo records, updating the view when the model changes.

app.TodoView = Backbone.View.extend({

	tagName: 'li',

	// cache the template function for a single item
	template: _.template($('#item-template').html()),

	// DOM events specific to an item:
	events: {
		'dblclick label': 'edit',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},

	// There's a one-to-one correspondence between a Todo and a TodoView. So, we set 
	// a direct reference on the model for convenience.
	initialize: function() {
		// this.model is the todo instance passed in from AppView
		this.listenTo(this.model, 'change', this.render);
	},

	// rerenders the titles of the todo item
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.$input = this.$('.edit');
		return this;
	},

	// switch view to "editing mode" by displaying the input field
	edit: function() {
		this.$el.addClass('editing');
		this.$input.focus();
	},

	// close the "editing mode", saving changes to the todo
	close: function() {
		
	}

});