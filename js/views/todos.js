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
		'blur .edit': 'close',
		'click .toggle': 'toggleCompleted',
		'click .destroy': 'clear'
	},

	// There's a one-to-one correspondence between a Todo and a TodoView. So, we set 
	// a direct reference on the model for convenience.
	initialize: function() {
		// this.model is the todo instance passed in from AppView
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'visible', this.toggleVisible)
	},

	// rerenders the titles of the todo item
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));

		this.$el.toggleClass('completed', this.model.get('completed'));
		this.toggleVisible();

		this.$input = this.$('.edit');
		return this;
	},

	// toggles visibility of a todo list item
	toggleVisible: function() {
	this.$el.toggleClass('hidden', this.isHidden());
	},

	// determines if an item should be hidden or not
	isHidden: function() {
	var isCompleted = this.model.get('completed');
	// return hidden cases only
	return (!isCompleted && app.TodoFilter === 'completed') || (isCompleted && app.TodoFilter === 'active');
	},

	// toggle the "completed" status of the model
	toggleCompleted: function() {
	this.model.toggle();
	},

	// switch view to "editing mode" by displaying the input field
	edit: function() {
		this.$el.addClass('editing');
		this.$input.focus();
	},

	// close the "editing mode", saving changes to the todo
	close: function() {
		var value = this.$input.val().trim();

		if (value) {
			this.model.save({ title: value });
		} else {
			this.clear();
		}

		this.$el.removeClass('editing');
	},

	// if you hit 'enter', we're done editing the item
	updateOnEnter: function(event) {
		if (event.which === ENTER_KEY) {
			this.close();
		}
	},

	// Remove the item and destroy the model
	clear: function() {
		this.model.destroy();
	}

});