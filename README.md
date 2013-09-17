# jquery.flattymenu

jqeury.flattymenu is a simply jQuery plugin that you can add a iOS7 like menu.

## Demo
[blog that is described.(ja)](http://akihiro.jugem.jp/?eid=300)

## Setup

```html
<body>
<head>
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css">
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script type="text/javascript" src="jquery.flattymenu/jquery.flattymenu-0.0.1.js"></script>
<script type="text/javascript">
$(function(){
	
	$("#menu").flattymenu({
		btnOpen:    "a.flattyOpen",
		btnClose:	"a.flattyClose",
		fixedHeaderElm:	"#header"
	});
	
});
</script>
</head>
<body>
<div id="header"><a href="javascript:;" class="btn btn-default btn-sm pull-right flattyOpen"><span class="glyphicon glyphicon-list"></span></a></div>
<div id="menu" style="display: none;">
	<h3><a href="javascript:;" class="pull-right flattyClose"><span class="glyphicon glyphicon-remove-circle"></span></a></h3>
	<div class="media profileBox"> <img src="http://tuna.tuna.be/p/2/2/profile.jpg" class="img-circle pull-left imageProfile" />
		<div class="media-body">
			<h4 class="media-heading">Akihiro Koyanagi</h4>
			<p>introduction introduction introduction introduction introduction </p>
			<small><a href="http://twitter.com/akihiro1977" target="_blank">http://twitter.com/akihiro1977</a></small> </div>
	</div>
	<h4>menu01</h4>
	<div class="list-group">
		<a href="example.html" class="list-group-item">Home</a>
		<a href="example.html" class="list-group-item"><span class="badge">8</span>Message</a>
		<a href="example.html" class="list-group-item">Items</a>
		<a href="example.html" class="list-group-item">Items</a>
		<a href="example.html" class="list-group-item">Items</a>
		<a href="example.html" class="list-group-item">Items</a>
		<a href="example.html" class="list-group-item">Items</a>
		<a href="example.html" class="list-group-item">Items</a>
		<a href="example.html" class="list-group-item"><span class="label label-info pull-right">New</span>Information</a>
	</div>
	<h4>menu02</h4>
	<div class="btn-group btn-group-justified">
		<a href="example.html" class="btn btn-default">menu02</a>
		<a href="example.html" class="btn btn-default">menu02</a>
		<a href="example.html" class="btn btn-default">menu02</a>
		<a href="example.html" class="btn btn-default">menu02</a>
	</div>
</div>
</body>
</html>
```



