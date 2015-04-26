 $(document).ready(function() {
 	//var app = {user: {firstname: "Thibault", lastname: "Milan", adress: "5, rue des Trinitaires, Metz, France", phone: "+33679889177", cb: {lastdigit: "6789", expire: "03/16"}, pizza: "Margherita"}};
 	//localStorage.setItem('app', JSON.stringify(app));
 	updateTemplates();
 	$('.toggleMenu').click(function() { $('.oc-container').toggleClass('oc-menu-open');});
 });



 function updateTemplates() {
 	$('div.templatized').remove();
 	var app = JSON.parse(localStorage.getItem('app'));

	var source   = $('script[type="text/x-handlebars-template"]');
	source.each(function(i) {
		var elem = source[i];
		var content = '<div class="templatized">'+Handlebars.compile($(elem).html())(app)+'</div>';
		//console.log(content);
		$(elem).after(content);
	});

 }