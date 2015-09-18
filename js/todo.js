$(function(){

	var ToDoItem = Backbone.Model.extend({});

	var ToDoCollection = Backbone.Collection.extend({
		url: 'getInitialTodo.php'
	});	
	
	var TodoView = Backbone.View.extend({
		el: $('#content'),
		render: function(){
			var self = this;
			if(!("collection" in this)){
			var items = new ToDoCollection();
				items.fetch({
					success: function(collection){
						self.collection = collection;
						renderCollectionStuff(collection, self);
					}
				});
			}
			else{
				renderCollectionStuff(self.collection, self);
			}
		}
	});
	var todoView = new TodoView();


	todoView.render();

	$('#submit').click(function(){
		var description = $('#description').val();
		var completed = $('#completed').val();
		var collection = todoView.collection;
		var nextId = 1;
		collection.forEach(function(model){
			var id = parseInt(model.get('id'));
			if(id > nextId){
				nextId = id;
			}
		});
		nextId += 1;
		var newItem = new ToDoItem({
			description: description,
			status: completed,
			id: nextId
		});
		collection.push(newItem);
		todoView.render();
	});
	
	function renderCollectionStuff(collection, self){
		var html;
		collection.forEach(function(model){
			html = html + '<tr id="'+model.get('id')+'"><td>' + model.get('description') + '</td><td>'+model.get('status')+'</td><td><button class="delete" data-id="'+model.get('id')+'">Delete</button></td></tr>';
			self.$el.html(html);
		});
			$('.delete').click(function(e){
				var button = $(e.currentTarget);
				var id = button.attr('data-id');
				var collection = todoView.collection;
				collection.remove(id);
				todoView.render();
			});

	}
});