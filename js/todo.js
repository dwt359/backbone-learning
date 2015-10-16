$(function(){

	var ToDoItem = Backbone.Model.extend({});

	var ToDoCollection = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("ToDo")
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
		var completed = 0;
		var collection = todoView.collection;
		var nextId = 0;
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
        collection.sync("create", newItem);
		todoView.render();
	});

	function renderCollectionStuff(collection, self){
		var html;
		collection.forEach(function(model){
			html = html + '<tr id="'+model.get('id')+'">' +
                '<td>' + model.get('description') + '</td>' +
                '<td>' +
                    '<select class="select-status '+model.get('id')+'">' +
                        '<option value=0'+((model.get('status') == 0)?' selected':'')+'>Pending</option>' +
                        '<option value=1'+((model.get('status') == 1)?' selected':'')+'>Completed</option>' +
                    '</select>' +
                '</td>' +
                '<td><button class="delete" data-id="'+model.get('id')+'">Delete</button></td>' +
            '</tr>';
			self.$el.html(html);
		});
        $('.delete').click(function(e){
            var button = $(e.currentTarget);
            var id = button.attr('data-id');
            var collection = todoView.collection;
            var item = collection.get(id);
            collection.sync("delete", item);
            collection.remove(id);
            todoView.render();
        });
        $('.select-status').on('change', function(e){
            var target = $(e.currentTarget);
            var id = target.attr('class').replace('select-status', '').trim();
            var val = target.val();
            var collection = todoView.collection;
            var item = collection.get(id);
            item.set('status', val);
            collection.sync("update", item);
        });
    }
});