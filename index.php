<!DOCTYPE html>
<html>
<head>
<style>
table, div#form{
	width: 400px;
	margin: auto;
	border: 1px solid black;
	border-collapse: collapse;
}
td, th{
	border: 1px solid black;
	padding: 2px;
}
label{
	display: block;
}
</style>
<title>Backbone To Do list App</title>
<script src="js/jquery-2.1.4.min.js"></script>
<script src="js/underscore-min.js"></script>
<script src="js/backbone-min.js"></script>
<script src="js/todo.js"></script>
</head>
<body>
<div id="wrapper">
<table>
<thead><th>Item</th><th>Completed</th><th></th></thead>
<tbody id="content"></tbody>
</table>
<div id='form'>
	<label>Item: <input type="text" id="description"></label>
	<label>Completed: <input type="text" id="completed"></label>
	<label><button id="submit">Add to List</button></label>
</div>
</div>
</body>
</html>